# VELOOP Rewards — Games

## Overview

A gamified rewards web application featuring playable mini-games, centralized Token & Game Coin economy, and a redemption center. Built with Vite + React, Vanilla CSS design tokens, custom 16:9 AVIF game artworks, dynamic auto-scrolling carousel, and resilient centralized state management.

### Implemented Phases
* **Phase 1**: Project foundation, React Router, clean architecture.
* **Phase 2**: VELOOP visual design system, `#161827` dark theme, typography, tokens.
* **Phase 3A**: 13-game catalog architecture (`gamesData.js`).
* **Phase 3B**: 13 standalone original 16:9 AVIF game artworks.
* **Phase 4**: Reusable `GameCard`, `TokenCost`, and `PlayNowButton` with shimmer effects.
* **Phase 5**: Continuous horizontal `GamesCarousel` with auto-scroll, loop duplication, and hover pause.
* **Phase 6**: Centralized `EconomyContext` with 100 Tokens / 20 Coins, dynamic affordability, double-spend lock, and `localStorage` resilience.
* **Phase 7**: Reusable `GameHome` architecture with distinct visual identities (Coin Catcher gold/treasure vs Memory Match indigo/puzzle), interactive first-time `GameGuideModal` with independent persistence, light-themed gameplay environment preparation, and `GameBottomNav`.

## Tech Stack

* React 18
* Vite
* React Router 6
* Lucide React
* Vanilla CSS Design System

## Routes

* `/` — VELOOP Rewards Platform Home
* `/games` — VELOOP Games Hub (Auto-scrolling 13-Game Carousel & Live Balance)
* `/games/coin-catcher` — Coin Catcher Game Home (Treasure Theme & Guide)
* `/games/coin-catcher/play` — Coin Catcher Gameplay Arena (Light Theme)
* `/games/memory-match` — Memory Match Game Home (Puzzle Theme & Guide)
* `/games/memory-match/play` — Memory Match Gameplay Arena (Light Theme)
* `/redeem` — Game Coin Redemption Center
* `/design-system` — Visual Design System Showcase
* `/game-cards` — 13-GameCard Component Test Bench (Phase 4)

## Local Development

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
