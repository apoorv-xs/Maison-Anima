# Behance Case Study: Maison Anima

An immersive digital flagship concept bridging historic Florentine leathercraft with advanced interactive customization and co-curated registries.

---

## ⚜️ Project Identity & Overview

```
PROJECT: MAISON ANIMA (Digital Flagship Experience)
ROLE: UI/UX Designer, Lead Creative Technologist
TECH: React + Vite, GSAP (ScrollTrigger), Web Audio API, Tailwind/Vanilla CSS
YEAR: 2026
```

### The Brief
To design and build a Behance-grade case study portfolio piece that honors classical equestrian saddle-making heritage. The digital flagship must avoid generic flat templates, instead employing modern spatial depth, foley-based soundscapes, and gold-foil monogram stamping to mimic the tactile luxury of physical Tuscan boutiques.

---

## 🎨 Visual Identity & Color System

The design system uses a curated, premium editorial color palette inspired by Tuscany and classic Italian fashion houses:

| Color | HEX | Usage | Feel |
| :--- | :--- | :--- | :--- |
| **Warm Ivory** | `#FDFBF7` | Main Background | Soft, paper-like texture, premium editorial canvas |
| **Soft Chalk** | `#FAF6F0` | Card & Panel Backdrops | Subtle depth contrast against Warm Ivory |
| **Tuscan Charcoal** | `#1C1B1A` | Headings & Primary Text | Softer than pure black; mimics luxury printed catalog ink |
| **Siena Tan** | `#B97C52` | Primary Brand Color | The natural hue of vegetable-tanned Italian saddle leather |
| **Ancora Rosso** | `#5E1914` | Brand Accent Red | Deep luxury crimson representing the signature gift boxes |
| **Verde Smeraldo** | `#17382B` | Brand Accent Green | Deep botanical green for call-outs and eco-packaging |
| **Fior di Latte** | `#FFFFFF` | Form Backgrounds | Clean, legible fields for input focus |

### Typography Blueprint
* **Primary Headings (Serif)**: `Playfair Display` — An elegant, high-contrast Italian serif representing classical craftsmanship.
* **Secondary Labels & Body (Sans-serif)**: `Work Sans` — A clean, neutral, highly legible grotesque typeface representing digital utility.

---

## 📽️ Key Interactive Case Studies

### 1. Visual Monogram Stamping & Zoom
* **The Monogram Foil Render**: Personalization initials are projected onto the iconic leather Jackie bag. Stamping choices include **Gold Foil** (metallic gradient with CSS keyframe shimmer loops) and **Blind Debossed** (inset letterpress shadows that calculate custom leather indentation depth).
* **GSAP Stamp Impact**: Clicking "Stamp" triggers a GSAP timeline that slams the initials down with a 3D scale impact, shakes the bag stage, and emits a radial vapor steam puff.
* **2.3x Detail Panner**: A camera inspect button translates the stage directly to the selected coordinate (**Center Strap**, **Front Panel**, or **Artisanal Clasp**) and overlays a simulated leather grain canvas noise mask.

### 2. Immersive Crafts Story (`/craft`)
An interactive scroll storytelling chronology detailing Florentine leathercraft.
* **Chapter 1: Sorting Tuscan Hides**: Rich text cards overlay a high-resolution Tuscan leather backdrop.
* **Chapter 2: The Dual Saddle-Stitch**: An SVG path represents the clasp structure. As the user scrolls, the line draws itself automatically using staggered dash offsets.
* **Chapter 3: Bamboo Curving**: Scroll progress heats a thermometer gauge bar from 0% to 100% at 180°C, inducing a golden drop-shadow glow around the curved cane.
* **Chapter 4: The Hot Stamp**: A heavy brass stamping press block drops down under 3 metric tons of static pressure, indenting the leather backing to emboss the final insignia.

### 3. Co-Curated Registry (`/registry/:token`)
A sharing portal allowing partners to review and edit registry bags.
* **3D Perspective Gift Notes**: A handwritten card floats in the 3D Z-plane, tilting its X and Y coordinates to follow the user's cursor movements.
* **Artisanal Guestbook**: Guests can enter their name, stamp their initials onto a wax seal badge, and write calligraphy notes.
* **Sync & Adopt**: Partners can sync their cart states to the database and generate share links, or click "Adopt Curation" to merge designs.

### 4. Boutique Cinematic HUD Controls
* **Foley Soundscape**: Uses the Web Audio API to synthesize ambient rainfall hums, rhythmic mechanical stitching taps, and slow piano chords.
* **Golden Alignment Grid**: Draws fine, golden editorial gridlines across the viewport to show off the alignment columns and Golden Ratio proportions.

---

## 💻 Tech Stack & Engineering Architecture

The frontend is designed with performance and security at its core:

* **Vite Bundler**: Extremely fast production compiling (<250ms modules transformed) generating streamlined static assets.
* **GSAP & ScrollTrigger**: Drives the high-performance CSS transformation matrices on scroll, keeping rendering frames locked at a fluid 60fps.
* **Web Audio API**: Synthesizes the ambient workspace audio procedurally in the browser, eliminating the load times of large audio source files.

---

## 🛡️ Production-Grade Security Architecture

Unlike simple design mockups, Maison Anima is fully hardened for client deployment:

* **Clickjacking Shield**: An immediate top-level frame-busting script inside the HTML `<head>` prevents UI redressing by redirecting frames to standalone locations.
* **Inactivity Auto-Logout**: A custom hook in `App.jsx` tracks mouse/keyboard interaction. It safely clears VIP login sessions and redirects to the login route after 5 minutes of inactivity.
* **PCI-DSS Compliant Card Validation**: Integrated Luhn's algorithm checksum validation on the checkout card fields. Autocomplete tags are disabled, and console telemetry traces mask the numbers (`****************`).
* **XSS Input Sanitization**: Form fields sanitize inputs on change, stripping scripts, custom event handlers (`onload`, `onerror`), and `javascript:` URIs to prevent DOM injection.
