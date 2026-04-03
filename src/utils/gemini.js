const apiKeys = [
  import.meta.env.VITE_API1,
  import.meta.env.VITE_API2,
  import.meta.env.VITE_API3,
  import.meta.env.VITE_API4,
  import.meta.env.VITE_API5,
  import.meta.env.VITE_API6,
  import.meta.env.VITE_API7,
  import.meta.env.VITE_API8,
  import.meta.env.VITE_API9,
  import.meta.env.VITE_API10,
].filter(Boolean);

let currentKeyIndex = 0;

// Track when a key is allowed to be used again (Date.now() timestamp)
const keyCooldowns = {};

export async function callGemini(prompt, maxTokens = 8192, mimeType = 'application/json') {
  let lastError = null;
  let allKeysOnCooldown = true;

  // Try each API key exactly once in round-robin order
  for (let i = 0; i < apiKeys.length; i++) {
    const index = (currentKeyIndex + i) % apiKeys.length;
    const apiKey = apiKeys[index];

    // If this key is marked as exhausted/cooling down, skip testing it entirely
    if (keyCooldowns[apiKey] && Date.now() < keyCooldowns[apiKey]) {
      const remainingSecs = Math.ceil((keyCooldowns[apiKey] - Date.now()) / 1000);
      console.warn(`API key at index ${index} is in cooldown for ${remainingSecs}s. Skipping...`);
      continue;
    }

    // A key is ready to test
    allKeysOnCooldown = false;

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: maxTokens,
              temperature: 0.9,
              responseMimeType: mimeType
            }
          })
        }
      );

      const data = await response.json();

      // Fallback on ANY error from the API (not just 429 quota limits)
      if (!response.ok || data.error) {
        const errorMsg = data.error ? data.error.message : `HTTP Error ${response.status}`;
        lastError = new Error(errorMsg);

        // Check if there is a specific wait time recommended by Google
        const match = errorMsg.match(/retry in ([\d\.]+)s/i);
        let waitSeconds = match ? parseFloat(match[1]) : 60; // Default wait to 60 seconds for errors

        // Mark this key as exhausted/failed so we don't attempt to use it again until cooldown passes
        keyCooldowns[apiKey] = Date.now() + (waitSeconds * 1000);
        console.warn(`API key at index ${index} failed (${errorMsg}). Marked as failed. Testing next key...`);

        continue; // Immediately try the next key in the array
      }

      // Success: update the current key index to the working key
      currentKeyIndex = index;

      const text = data.candidates[0].content.parts[0].text;
      return text.replace(/```json|```/g, '').trim();
    } catch (err) {
      lastError = err;
      // Default to a 60 second cooldown on network/fetch errors
      keyCooldowns[apiKey] = Date.now() + (60 * 1000);
      console.warn(`API key at index ${index} threw an error: ${err.message}. Testing next key...`);
      continue;
    }
  }

  // If we reach this point, all available keys were either skipped (on cooldown) or failed
  if (allKeysOnCooldown) {
    throw new Error("All API keys are currently full or disabled. Please wait a minute for quotas to reset.");
  }

  throw lastError || new Error("All API keys exhausted their quotas or returned an error.");
}
