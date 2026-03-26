# ✨ BlogForge AI V2

> India's most powerful AI blog engine — from keyword to ranked blog post in under 10 minutes. Now with **V2 Glassmorphism UI** and **Gemini 2.0 Flash** engine.

![BlogForge AI](https://img.shields.io/badge/Gemini%202.0%20Flash-Powered-purple?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-yellow?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase)

---

## 🚀 What is BlogForge AI?

BlogForge AI is a premium full-stack SaaS platform that automates your entire SEO content pipeline. Powered by **Gemini 2.0 Flash**, it combines high-speed generation with deep SEO intelligence to help you dominate SERPs in record time.

---

## ✨ Key Features (V2 Dashboard)

### 🤖 SEO & Research Modules
| Feature | Description |
|---|---|
| **SERP Gap Scanner** | Finds missing topics in top 10 competitor results |
| **Live SEO Scorer** | 10-metric real-time scoring including NLP & AI detection risk |
| **Keyword Planner** | AI-driven intent mapping and volume estimation |
| **Competitor Spy** | Deep-dive analysis of any URL's content strategy |
| **Cluster Map** | Visualises your topical authority universe |

### ✍️ Content & Editing
| Feature | Description |
|---|---|
| **AI Blog Generator** | Long-form (2,500+ words) SEO-optimised generation |
| **Premium Blog Editor** | Glassmorphism-rich distraction-free writing environment |
| **My Blogs Library** | Centralised vault for all your content assets |
| **Brand Voice Control** | Custom AI training on your unique writing style |

### 🔄 Publishing & Analytics
| Feature | Description |
|---|---|
| **Auto-Publisher** | One-click export to WordPress, Webflow, and Shopify |
| **Content Calendar** | Visual drag-and-drop planning for your team |
| **Traffic Tracker** | Live monitoring of organic growth and rankings |
| **ROI Dashboard** | Track conversion value of every published word |

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Vanilla CSS (glassmorphism dark design system)
- **AI Engine**: Google Gemini 2.0 Flash (`gemini-2.0-flash`)
  - Optimized for low-latency SEO scanning and high-accuracy generation.
- **Authentication**: Firebase Auth (Google Sign-In)
- **State/Persistence**: React state + `localStorage`
- **Icons**: Lucide React

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/nmnroy/blogforge-ai.git
cd blogforge-ai

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Firebase Setup (Google Sign-In)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Google Sign-In** under Authentication → Sign-in methods
3. Register a **Web App** and copy your config
4. In `index.html`, replace the placeholder values in the Firebase config block:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

> **Note:** Without Firebase config, the app falls back to a dev mode that skips authentication and loads the dashboard directly.

### Gemini API
The Gemini API key is already configured for demo purposes. For production, move it to a **server-side proxy** or environment variable to prevent key exposure.

---

## 📁 Project Structure

```
blogforge-ai/
├── public/
│   └── pipeline.png          # How It Works section asset
├── src/
│   ├── App.jsx               # Main SPA — marketing site + routing
│   ├── Dashboard.jsx         # Full dashboard with all 12 modules
│   └── index.css             # Global design system (glassmorphism)
├── index.html                # Firebase SDK + config injection
├── vite.config.js
└── package.json
```

---

## 🎨 Design System

- **Theme**: Dark glassmorphism (V2 Design System)
- **Fluid UI**: Dynamic scaling and micro-interactions
- **Tokens**: Design-token driven architecture (`tokens.css`)
- **Primary Accent**: `#7C3AED` (violet)
- **Secondary Accent**: `#06B6D4` (cyan)
- **Font**: Inter & Outfit (Google Fonts)

---

- [x] Firebase Authentication (Google Sign-In)
- [x] V2 Glassmorphism UI Implementation
- [ ] Supabase/Firebase Firestore backend for blog persistence
- [ ] Real WordPress REST API / Webflow CMS publishing
- [ ] Google Search Console integration for live traffic data
- [ ] AI image generation per blog post

---

## 📄 License

MIT © 2025 BlogForge AI
