# 🏛️ Maison Anima

A premium, high-fidelity luxury e-commerce frontend experience inspired by archival Gucci and Italian design aesthetics. Built with React 19, React Router 7, Vite, and GSAP animations, featuring foley audio synthesis and deep personalization integrations.

![Maison Anima Home Page Screenshot](./public/assets/maison_anima_home.png)

---

## ✨ Immersive Case Study Features

Maison Anima is built to serve as a Behance-grade conceptual digital flagship showcase. It contains the following advanced modules:

### 🎨 1. Aura Monogram Customizer
* **Personalized Stamping**: Clients can configure initials directly on the iconic leather Jackie Bag. Select **Gold Foil** (metallic gold gradient with a CSS keyframe shimmer loop) or **Blind Debossed** (leather indentation shadowing that matches the specific tan, rosso, smeraldo, or nero finish).
* **Press Impacts & Steam Puffs**: The "Stamp" action fires a GSAP timeline that slams the initials down with a 3D scale impact, shakes the bag stage, and emits an expanding vapor puff.
* **2.3x Camera Zoom**: Toggling "Detail Zoom" pans and scales the canvas (by 230%) directly to the selected stamp coordinate (**Center Strap**, **Front Panel**, or **Artisanal Clasp**) while rendering a grain leather overlay mask.

### 📜 2. Scroll-Driven "Crafts Story" (`/craft`)
An editorial storytelling page rendering the Florentine saddle-making chronology:
* **Sorting Tuscan Hides**: Text cards reveal details over full-screen leather grain backdrop panels.
* **The Saddle-Stitch**: Uses a double-needle crossed stitch path. As the user scrolls, the SVG thread stitches draw themselves dynamically.
* **Bamboo Curving**: Scroll events heat a thermometer gauge bar from 0% to 100% at 180°C, adding a golden hot glow to the handle curvature.
* **Hot Brass Stamping**: A heavy brass block press slides down under static pressure to bounce-impact and deboss the final golden brand mark.

### 🌐 3. Co-Curated Registry Portal (`/registry/:token`)
* **3D Perspective Cards**: Handwritten registry note cards translate X and Y coordinates to follow mouse movements with realistic spatial depth.
* **Bespoke Guestbook**: Visitors can type custom notes, stamp initials onto a red wax seal icon, and add messages to the cloud sync ledger.
* **Sync & Adopt Curation**: Sync cart states to database maps in local storage and generate clipboard share links. Partners can click "Adopt Curation" to auto-load designs.

### 🎹 4. Boutique Foley Controls HUD
* **Ambient Soundscape**: Synthesizes ambient boutique foley using the **Web Audio API**: Tuscan rainfall hums, workshop stitching taps, and slow piano chord arpeggios.
* **Golden Alignment Grid**: Overlays thin golden column lines across the viewport conforming to the Golden Ratio proportions.

### ⚜️ 5. VIP Client Private Salon (`/profile` & `/login`)
* **Wax Seal Entry invitation**: VIP passcode validation (`VIP@anima.com` / `1921`) triggers a heavy red wax seal GSAP impact drop that shakes the login form.
* **Private Salon**: Displays a dynamic client level card (e.g. *Elite Collector*), Virtual Wardrobe order history, and default Bespoke Styling preferences.
* **Bidirectional Customizer Sync**: Personalizing initials, foil type, and position in the Customizer syncs back to the client's profile in real-time, and vice versa.

### 🗺️ 6. 3D Parallax Lookbook Grid (`/journal`)
* Hovering over editorial lookbook pages tilts the card frame in 3D, shifting the background campaign image in the direction of the cursor while moving the side text panel in the opposite direction.
* Dynamic hotspot pins link directly to database products in [api.js](file:///a:/fun/wicked%20projects/maison-anima/src/utils/api.js) via `MaisonCMS`. Clicking **"Quick View"** displays the shared premium details modal overlay.

---

## 🛡️ Frontend Security Implementation

Maison Anima implements client-side security standards matching production-grade e-commerce sites:

* **Clickjacking Frame-Busting**: Script in index.html redirects top-level window locations if loaded within foreign iframes.
* **Inactivity Session Timeout**: Safe auto-logout after 5 minutes of inactivity, clearing storage credentials.
* **PCI-DSS Compliant Checks**: Form card inputs check digits using Luhn's Algorithm. Input fields disable auto-autocomplete (`off`) and telemetry logger console logs mask credit cards (`****************`).
* **Input XSS Filter Shield**: Strips HTML tags, event handlers (`onload`, `onerror`), and `javascript:` protocols from guest input fields.

---

## 🛠️ Tech Stack & Libraries

* **Framework**: React 19 (Hooks, Portals)
* **Routing**: React Router v7
* **Animations**: GSAP (GreenSock Animation Platform) + ScrollTrigger
* **Audio**: Web Audio API (procedural oscillator/noise nodes)
* **Bundler & Server**: Vite 8
* **Styling**: Premium Custom Vanilla CSS

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
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
├── public/                 # Static assets (Jackie bag renders, campaign photos)
├── src/
│   ├── assets/             # Brand logos
│   ├── components/         # Global widgets & HUDs
│   │   ├── BagDrawer.jsx        # Mini cart drawer listing quantity breakdowns
│   │   ├── BoutiqueControls.jsx # Web Audio synth controls & alignment grid
│   │   ├── Customizer.jsx       # Gold foil/deboss monogram designer
│   │   ├── Editorial.jsx        # Runway catalog listings
│   │   ├── Header.jsx           # Monogram user avatar nav
│   │   ├── MenuDrawer.jsx       # Mobile link panels
│   │   └── ProductModal.jsx     # Shared catalog detail modal
│   ├── pages/              # Routing page entries
│   │   ├── Cart.jsx             # Secure checkout validation & sync
│   │   ├── Craft.jsx            # ScrollTrigger crafts animation
│   │   ├── Home.jsx             # Landing with synced customizer
│   │   ├── Journal.jsx          # 3D parallax campaign hotspots
│   │   ├── Login.jsx            # Wax stamp VIP login
│   │   ├── Profile.jsx          # Client wardrobe & default prefs
│   │   └── Registry.jsx         # 3D tilt note shared portal
│   ├── utils/              
│   │   └── api.js               # Headless CMS products & Cloud DB simulator
│   ├── App.jsx             # App router & global preference state
│   ├── index.css           # Custom CSS luxury variables & animations
│   └── main.jsx            # Root entry mount
├── behance_case_study.md   # Publication case study documentation
└── package.json
```
