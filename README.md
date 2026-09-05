# VELOOP Rewards — Games Banner

A high-performance, responsive, gamified arcade and rewards ecosystem developed for the **VELOOP Rewards** platform. Built with React 19, Vite, Vanilla CSS Design System, HTML5 Canvas 2D engine, and centralized economy architecture.

---

## 🚀 Live Demo & Deployment
- **Repository**: [https://github.com/Deepanshtyagi331/velop-games](https://github.com/Deepanshtyagi331/velop-games)
- **Deployment Support**: Configured for instant single-page application (SPA) hosting on **Vercel** with clean rewrite routing rules via [vercel.json](file:///Users/deepanshtyagi/Documents/velop-games/vercel.json).
*(A live Vercel URL can be deployed directly from the GitHub repository).*

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router 7 (SPA architecture with client-side history navigation)
- **Styling & Components**:
  - Pure Vanilla CSS Design System with custom tokens ([variables.css](file:///Users/deepanshtyagi/Documents/velop-games/src/styles/variables.css))
  - CSS Modules (`.module.css`) for component-scoped styles ([RecentRedemptions.module.css](file:///Users/deepanshtyagi/Documents/velop-games/src/components/redemption/RecentRedemptions.module.css))
  - Bootstrap (installed dependency in [package.json](file:///Users/deepanshtyagi/Documents/velop-games/package.json))
  - Rich dark theme canvas (`#161827`) with elevated glass surfaces
  - Independent high-contrast light environments for arcade gameplay
  - WCAG 2.1 AA accessible contrast ratios and high-visibility `:focus-visible` rings
  - Full `@media (prefers-reduced-motion: reduce)` system integration
- **Graphics & Assets**:
  - HTML5 Canvas 2D with `requestAnimationFrame` 60fps loop for Coin Catcher
  - 3D CSS perspective card flips (`transform-style: preserve-3d`) for Memory Match
  - 13 custom-generated, high-efficiency **AVIF** game artworks (16:9 aspect ratio)
  - Dedicated transparent SVG vector icons for Token and Game Coin in `public/assets/icons/`
- **State & Architecture**: Centralized React Context (`EconomyContext.jsx`) with atomic transactions, double-spend concurrency locks, and `localStorage` resilience.
- **Icons**: Lucide React

---

## ✨ Features

1. **13-Game Continuous Carousel**:
   - Seamless horizontal loop rendering all 13 titles with duplicated buffer tracking.
   - Smooth continuous auto-scroll (~0.7px/frame) with automatic hover pause and touch-drag resume.
   - Mouse-drag panning on desktop and touch-swipe on mobile.
   - Interactive accessible dot indicators with keyboard focus.
   - Strictly free of clumsy previous/next navigation arrows.
2. **Centralized Token & Coin Economy**:
   - Single source of truth for **Tokens** (play passes) and **Game Coins** (earned currency).
   - Playable game entry strictly costs **20 Tokens** deducted once at launch.
   - Replay, Revive, Game Home navigation, and Redemption never deduct tokens.
   - Idempotent transaction locks prevent double deductions from rapid clicking or re-renders.
   - Automatic fallback persistence in `localStorage['velop-economy']`.
3. **Two Fully Playable Original Games**:
   - **Coin Catcher** (`/games/coin-catcher/play`): 60fps Canvas arcade game with catcher movement, falling coins, star gems, hazard bombs, particle bursts, screen shake, and light arena theme.
   - **Memory Match** (`/games/memory-match/play`): 4×4 3D flip card puzzle with 8 icon pairs, Fisher-Yates deck shuffle, combo multipliers, countdown timer, and race-condition guards.
4. **First-Time Game Guide & Tutorial Modals**:
   - Accessible pre-game tutorial modals (`GameGuideModal.jsx`) displaying objectives, scoring rules, and controls.
   - Independent tutorial persistence per game (`velop-guide-coin-catcher`, `velop-guide-memory-match`).
5. **Reward Settlement & Revive System**:
   - Deterministic reward calculation based on performance.
   - 1-per-round Revive flow:
     - Coin Catcher restores 2 lives and clears nearby hazards.
     - Memory Match adds +20 seconds while preserving current board and pairs.
   - Idempotent settlement guard: every session credits Game Coins strictly once.
6. **Redemption Center (`/redeem`)**:
   - Marketplace converting Game Coins into 5 tangible platform assets (VE Points, SVE Points, Gems, Tokens, and Spins).
   - Atomic token conversion: adds tokens and deducts coins in a single synchronized state update.
   - Dynamic affordability feedback ("Redeem Reward" vs "Need X More").
   - Synchronous double-click guard and persistent recent redemption log.
7. **Comprehensive Responsiveness (320px to 1920px)**:
   - Zero horizontal scroll overflow across all screen sizes.
   - Mobile-first touch targets ($\ge 44\text{px}$) and adaptive layouts.

---

## 🎮 13-Game Catalog

| # | Game Title | Category | Type | Route | Description |
| :-: | :--- | :---: | :---: | :--- | :--- |
| **1** | **Coin Catcher** | Arcade | **Playable** | `/games/coin-catcher` | Catch falling coins and gems while evading hazard bombs in high-stakes arcade action. |
| **2** | **Memory Match** | Puzzle | **Playable** | `/games/memory-match` | Test cognitive recall by matching illustrated reward cards before time expires. |
| **3** | **Color Rush** | Reflex | Banner Showcase | `/games/color-rush` | Match shifting spectrum lines at lightning speed to trigger score multipliers. |
| **4** | **Tile Tap** | Reflex | Banner Showcase | `/games/tile-tap` | Rhythmic precision tapping on reactive glowing tiles without missing a single beat. |
| **5** | **Fruit Slice** | Arcade | Banner Showcase | `/games/fruit-slice` | Slice through airborne cascades of fresh reward fruits with swift blade swipes. |
| **6** | **Number Dash** | Challenge | Banner Showcase | `/games/number-dash` | Rapid-fire math and numerical sequence challenges for analytical thinkers. |
| **7** | **Bubble Pop** | Arcade | Banner Showcase | `/games/bubble-pop` | Aim and pop floating clusters of luminous orbs to trigger chain reactions. |
| **8** | **Lucky Spin** | Chance | Banner Showcase | `/games/lucky-spin` | Spin the gleaming fortune wheel for opportunities to unlock bonus Game Coins. |
| **9** | **Word Sprint** | Word | Banner Showcase | `/games/word-sprint` | Race against the clock to connect anagram letters and assemble vocabulary words. |
| **10** | **Stack Master** | Skill | Banner Showcase | `/games/stack-master` | Stack floating architectural blocks with laser-sharp timing to build towers. |
| **11** | **Target Hit** | Reflex | Banner Showcase | `/games/target-hit` | Hone precision aiming and hit moving bullseyes under countdown pressure. |
| **12** | **Gem Collector** | Collection | Banner Showcase | `/games/gem-collector` | Harvest sparkling crystals and rare gemstones across cavernous mines. |
| **13** | **Spin & Win** | Reward | Banner Showcase | `/games/spin-and-win` | Celebratory wheel awarding premium token bonuses and exclusive multipliers. |

---

## 🔬 Game Research & Mechanics Reference

Both playable titles were developed as independent implementations based on established arcade and puzzle game theory:

1. **Coin Catcher (Arcade Collection Mechanics)**:
   - **Research Reference**: Inspired by classical paddle and falling-item reflex titles (*Kaboom!*, *Catch the Apples*).
   - **Engine Design**: Built from scratch using native HTML5 Canvas 2D and `requestAnimationFrame`. Delta-time physics (`Math.min((t - last) / 1000, 0.1)`) ensure deterministic 60fps mechanics across devices.
   - **Difficulty Progression**: Dynamic scaling curve where fall velocity escalates from $160\text{px/s}$ to $300\text{px/s}$ and bomb hazard frequency scales from $18\%$ to $35\%$ over 60 seconds.
   - **Reward Algorithm**: Deterministic tiered reward formula converting final score into Game Coins ($+5$ to $+20$ Coins).

2. **Memory Match (Cognitive Recall Mechanics)**:
   - **Research Reference**: Modeled on classical pairing puzzle systems (*Concentration / Pelmanism*).
   - **Deck Randomization**: Employs the unbiased Fisher-Yates shuffle algorithm on a 4×4 grid of 16 illustrated cards (8 matching pairs).
   - **3D Flip Architecture**: Native CSS 3D matrix transforms (`transform: rotateY(180deg)` with `transform-style: preserve-3d` and `backface-visibility: hidden`).
   - **Streak Multipliers**: Consecutive matches trigger combo bonuses ($+50\text{ bonus pts}$ per streak), rewarding accurate cognitive recall.

---

## 💰 Economy Rules & Token Lifecycle

1. **Initial Prototype Balance**: `100 Tokens` & `20 Game Coins`.
2. **Exact Token Flow Order**:
   - **Games Hub (`/games`)**: Browsing carousel and clicking "Play Now" routes to the game's Home page with **0 Tokens deducted**.
   - **Game Home (`/games/coin-catcher` or `/games/memory-match`)**: Displays game specs, Game Coin balance, and entry fee.
   - **Game Home Play Now**: Clicking "Play Now" checks for $\ge 20$ Tokens, **deducts strictly 20 Tokens here**, and initiates the session.
   - **Guide**: First-time players view the tutorial modal before entering gameplay.
   - **Active Gameplay**: Launches into the arena with balance updated (e.g. 100 → 80 Tokens).
3. **No Double Charges**: Reading tutorials, replaying from Game Over, or using a Revive costs **0 additional Tokens**.
4. **Reward Crediting**:
   - Coin Catcher rewards up to **15 Game Coins** based on collected items and score.
   - Memory Match rewards up to **20 Game Coins** based on matched pairs and time bonus.
   - Rewards are added directly to the shared, centralized Game Coin balance.
5. **Redemption**:
   - Spent through the `/redeem` marketplace.
   - When redeeming **20 Tokens** for **50 Game Coins**, Game Coins decrease by 50 and Tokens increase by 20 atomically.

---

## 🧭 Application Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home Page** | Platform landing page with hero overview and quick access to games. |
| `/games` | **Games Hub** | Main arcade hub featuring the 13-game auto-scrolling carousel and live balances. |
| `/games/coin-catcher` | **Coin Catcher Home** | Game Home pre-game entry experience, specs, rules, and tutorial trigger. |
| `/games/coin-catcher/play` | **Coin Catcher Arena** | Full-screen light-environment 60fps Canvas arcade game. |
| `/games/memory-match` | **Memory Match Home** | Game Home pre-game entry experience, specs, rules, and tutorial trigger. |
| `/games/memory-match/play` | **Memory Match Arena** | Full-screen light-environment 4×4 3D flip card puzzle. |
| `/games/:gameSlug` | **Banner Showcase** | Thematic showcase page for any of the 11 catalog banner titles. |
| `/redeem` | **Redemption Center** | Market converting Game Coins into VE, SVE, Gems, Tokens, and Spins. |
| `*` | **Not Found** | Friendly 404 recovery page with route navigation. |

---

## 💻 Running Locally

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting
```bash
npx oxlint
```

### Production Build
```bash
npm run build
```

### Production Preview
```bash
npm run preview
```
