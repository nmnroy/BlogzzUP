<div align="center">

<br />

<img src="public/favicon.svg" width="72" alt="BlogForge AI logo" />

# BlogForge AI

**India's #1 Autonomous AI Blog Engine**

*From keyword to ranked blog post — in under 10 minutes.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-blogforge.ai-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://github.com/nmnroy/blogforge-ai)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

<br />

![BlogForge AI Hero](public/pipeline.png)

</div>

---

## ✦ What is BlogForge AI?

BlogForge AI is a **premium SaaS platform** that uses a 7-stage AI prompt pipeline to autonomously research, write, SEO-optimize, and publish blog content directly to your CMS — zero writers needed.

> Stop fighting writer's block. BlogForge does the work. You get the traffic.

---

## 🚀 Features

| Module | Description |
|---|---|
| 🧠 **AI Blog Generator** | Generates 2,500+ word, SEO-optimized articles from a single keyword |
| 🔍 **SERP Gap Scanner** | Analyzes top-10 results and finds missing topics competitors skip |
| 🗺️ **Cluster Map Planner** | Visual topic universe builder for pillar pages and topic clusters |
| 📊 **Live SEO Scorer** | Real-time 10-metric content score (readability, density, snippets) |
| ☁️ **Auto-Publisher** | One-click sync to WordPress, Webflow, Shopify, Ghost, and more |
| 🎙️ **Brand Voice Control** | Train the AI on your tone, audience, and negative keywords |
| 🌍 **GEO Optimizer** | Automatically targets every city in your market |
| 🔁 **Social Repurpose** | Turns one blog into 10+ social media content pieces |

---

## 🏗️ Tech Stack

```
Frontend   →  React 19 + Vite 8
Styling    →  Vanilla CSS + Custom Design Token System (tokens.css)
Icons      →  Lucide React
Auth       →  Firebase Authentication (Google Sign-In)
AI         →  Google Gemini API
Publish    →  WordPress REST API · Webflow CMS API · Shopify Admin API
```

---

## 📁 Project Structure

```
blogforge-ai/
├── public/
│   ├── favicon.svg         # Brand icon
│   ├── icons.svg           # Icon sprites
│   └── pipeline.png        # Hero pipeline image
├── src/
│   ├── tokens.css          # Design token system (colors, spacing, motion)
│   ├── index.css           # Global layout & component styles
│   ├── interactions.css    # Hover, focus & micro-animation styles
│   ├── a11y.css            # Accessibility overrides & focus-visible styles
│   ├── App.jsx             # Main app — marketing site + routing
│   ├── Dashboard.jsx       # Full SaaS dashboard UI
│   ├── Dashboard.css       # Dashboard-specific styles
│   ├── BlogEditor.jsx      # Rich blog editing interface
│   ├── BlogEditor.css      # Editor styles
│   ├── PromptArchitecture.jsx  # 7-stage AI prompt pipeline viewer
│   ├── CommandPalette.jsx  # ⌘K command palette
│   ├── ToastSystem.jsx     # Global toast notifications
│   └── main.jsx            # React entry point
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A **Firebase** project (for auth)
- A **Gemini API** key

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/nmnroy/blogforge-ai.git
cd blogforge-ai

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Your app will be live at **http://localhost:5173** 🎉

---

## 🔑 Firebase Setup (Google Sign-In)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Google** as a sign-in provider under **Authentication**
3. Copy your Firebase config into `src/App.jsx` where you see:
   ```js
   const firebaseConfig = {
     apiKey: "PASTE_FIREBASE_API_KEY",
     // ...
   };
   ```
4. Add your domain to **Authorized Domains** in Firebase Console

---

## 🤖 Gemini API

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Paste it into `src/BlogEditor.jsx` where the Gemini client is initialized

---

## 🎨 Design System

BlogForge AI uses a hand-crafted token system built entirely in CSS:

| Token Category | File |
|---|---|
| Color, spacing, radius, motion | `src/tokens.css` |
| Global layout, navbar, hero, footer | `src/index.css` |
| Hover effects, micro-animations | `src/interactions.css` |
| Accessible focus styles | `src/a11y.css` |

All components consume `var(--token-name)` — no hardcoded hex values in component files.

---

## 📦 Build for Production

```bash
npm run build
# Output → dist/
```

---

## 📄 License

MIT © 2026 [BlogForge AI](https://github.com/nmnroy/blogforge-ai) · Built with ❤️ in India 🇮🇳

---

<div align="center">

⭐ **Star this repo if BlogForge saves you hours of content work!**

</div>
