# 🏛️ Maison Anima

A premium, high-fidelity luxury e-commerce frontend experience inspired by archival Gucci aesthetics. Built with modern React 19, React Router 7, Vite, and GSAP animations.

---

## ✨ Key Features

*   **Premium Brand Landing**: Editorial layouts, high-fidelity brand grids, and smooth fluid grids designed to evoke a modern luxury editorial house.
*   **GSAP Header & Stagger Animations**: Staggered scroll fades, slide effects, and smooth header transitions as the user scrolls.
*   **Interactive 3D & Customization Studio**: A custom personalizer interface (`Customizer.jsx`) that lets clients choose colors, add custom monograms, and configure high-luxury leather goods in real time.
*   **Interactive Cart Drawer & Page**: Complete client-side shopping bag experience, with a sliding drawer (`BagDrawer.jsx`) and a standalone review screen (`Cart.jsx`) backed by `localStorage` persistence.
*   **Smooth Page transitions**: Custom cubic-bezier route transitions creating a unified, fluid app experience when shifting pages.

---

## 🛠️ Tech Stack

*   **Framework**: React 19 (Functional Components, Hooks)
*   **Routing**: React Router v7
*   **Animations**: GSAP (GreenSock Animation Platform)
*   **Bundler & Dev Server**: Vite 8
*   **Styling**: Premium Custom Vanilla CSS

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   npm or yarn

### Installation

1. Clone this repository (once pushed):
    ```bash
    git clone https://github.com/apoorv-xs/maison-anima.git
    cd maison-anima
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Build for production:
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```text
maison-anima/
├── public/                 # Static assets & icons
├── src/
│   ├── assets/             # Brand images & svg assets
│   ├── components/         # Reusable UI components (Header, Footer, Customizer, Drawer)
│   ├── pages/              # Routed page components (Home, Collections, Customization, Cart)
│   ├── utils/              # Client utilities
│   ├── App.jsx             # Main router & global state
│   ├── index.css           # Core stylesheet & typography tokens
│   └── main.jsx            # React root mount
├── package.json
└── vite.config.js
```
