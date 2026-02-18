# 🕵️ Impostor GameWeb

> A multiplataforma social deduction game — Web, iOS & Android  
> Built with **Expo + React Native + TypeScript + Supabase**

[![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com)

---

## 📁 Project Structure

```
Impostor_GameWeb/
├── src/
│   ├── components/     # Reusable UI components (Button, Card, …)
│   ├── screens/        # App screens (HomeScreen, AuthScreen, …)
│   ├── services/       # External services (supabase.ts)
│   ├── hooks/          # Custom React hooks (useAuth.ts)
│   ├── types/          # Shared TypeScript types (index.ts)
│   ├── constants/      # Design tokens (theme.ts)
│   └── utils/          # Utility functions (index.ts)
├── assets/             # Images, icons, fonts
├── .env.example        # Environment variable template (commit this)
├── .env                # Local secrets — DO NOT COMMIT
├── app.json            # Expo app configuration
├── tsconfig.json       # TypeScript strict config + path aliases
└── metro.config.js     # Metro bundler with path alias support
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) app on your phone (for testing)

### 2. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/impostor-gameweb.git
cd impostor-gameweb
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> Get these from [app.supabase.com](https://app.supabase.com) → Project Settings → API

### 4. Run the App

```bash
# Start Metro bundler
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK (React Native) |
| Language | TypeScript (Strict Mode) |
| Backend | Supabase (Auth + Database + Realtime) |
| Styling | React Native StyleSheet |
| Design System | `src/constants/theme.ts` |

---

## 🔐 Security

- **No hardcoded secrets** — all credentials via `.env`
- **`.env` is gitignored** — only `.env.example` is committed
- **Supabase RLS** — Row Level Security policies protect all tables
- **TypeScript strict mode** — prevents runtime type errors

---

## 📱 App Store Compliance

- ✅ Apple Human Interface Guidelines
- ✅ Google Material Design 3
- ✅ iOS `bundleIdentifier`: `com.impostorgameweb.app`
- ✅ Android `package`: `com.impostorgameweb.app`

---

## 🧪 Development Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator/device (macOS only)
npm run web        # Run in browser
npx tsc --noEmit   # Type-check without building
```

---

## 📝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---

## 📄 License

MIT © 2026 Impostor GameWeb Team
