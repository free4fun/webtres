# 🌐 webtres.uy

**webtres.uy** is the official website of the Web3 club in Uruguay — a community focused on education, events, and content around blockchains, and decentralized technologies in Uruguay and beyond.

## ✨ Features

- ✍️ Educational blog about Web3 and Ethereum
- 📅 Local and global Web3 event listings
- 🌐 Multilingual support (Spanish 🇪🇸 / English 🇬🇧)
- 🌓 Dark mode and light mode
- 📱 Mobile-first and fully responsive design
- ⚛️ Frontend powered by React + TypeScript + Tailwind CSS
- 🛠️ Backend with Node.js + Express + PostgreSQL (coming soon)
- ♻️ Modular and reusable UI components

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Router
- **Internationalization**: i18next
- **Styling**: Tailwind CSS with custom design tokens (`theme.config.ts`)
- **State management**: Context API (Zustand optional)
- **Backend**: Node.js + Express (in progress)
- **Database**: PostgreSQL + Prisma (in progress)

## 🛠️ Getting Started

```bash
git clone https://github.com/fre4fun/webtresuy-website.git
cd webtresuy-website
pnpm install
pnpm dev
```

> Requirements:
> - Node.js 18+
> - pnpm (`npm install -g pnpm`)
> - Vite (already included via template)

## 🌍 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Main pages: Home, Blog, Events, Contact
├── i18n/               # Translation files
├── theme.config.ts     # Design tokens and theme settings
├── tailwind.config.js  # Tailwind CSS config
└── App.tsx             # App entry and routes
```

## 📦 Useful Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm preview   # Preview production build
```

## 📬 Contact

Want to join or collaborate?  
Email us at contacto@webtres.uy or visit [webtres.uy](https://webtres.uy)

## 🧠 License

GPLv3 — Free to use, modify and share.
