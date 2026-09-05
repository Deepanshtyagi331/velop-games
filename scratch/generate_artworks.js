import fs from 'fs';
import path from 'path';

function createTileTap() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1e254a" />
        <stop offset="50%" stop-color="#141830" />
        <stop offset="100%" stop-color="#0c0e1e" />
      </radialGradient>
      <linearGradient id="tileGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#4338ca" />
      </linearGradient>
      <linearGradient id="tileBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#28305c" />
        <stop offset="100%" stop-color="#181d38" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <radialGradient id="ripple" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stop-color="rgba(56, 189, 248, 0)" />
        <stop offset="90%" stop-color="rgba(56, 189, 248, 0.4)" />
        <stop offset="100%" stop-color="rgba(99, 102, 241, 0)" />
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)" />
    <!-- Background Grid Lines -->
    <g opacity="0.15" stroke="#6366f1" stroke-width="1">
      <line x1="0" y1="180" x2="1280" y2="180" />
      <line x1="0" y1="360" x2="1280" y2="360" />
      <line x1="0" y1="540" x2="1280" y2="540" />
      <line x1="320" y1="0" x2="320" y2="720" />
      <line x1="640" y1="0" x2="640" y2="720" />
      <line x1="960" y1="0" x2="960" y2="720" />
    </g>
    <!-- Concentric Sonic Ripples -->
    <ellipse cx="640" cy="380" rx="360" ry="180" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.2" />
    <ellipse cx="640" cy="380" rx="260" ry="130" fill="none" stroke="#6366f1" stroke-width="2" opacity="0.4" />
    <ellipse cx="640" cy="380" rx="170" ry="85" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.7" filter="url(#glow)" />
    <!-- Isometric Grid of Tiles -->
    <g transform="translate(640, 380)">
      <!-- Surrounding Tiles -->
      <g opacity="0.7">
        <polygon points="-240,-80 -140,-130 -40,-80 -140,-30" fill="url(#tileBase)" stroke="#3d497c" stroke-width="2" />
        <polygon points="40,-80 140,-130 240,-80 140,-30" fill="url(#tileBase)" stroke="#3d497c" stroke-width="2" />
        <polygon points="-240,60 -140,10 -40,60 -140,110" fill="url(#tileBase)" stroke="#3d497c" stroke-width="2" />
        <polygon points="40,60 140,10 240,60 140,110" fill="url(#tileBase)" stroke="#3d497c" stroke-width="2" />
        <polygon points="-360, -10 -260,-60 -160,-10 -260,40" fill="url(#tileBase)" stroke="#2d365e" stroke-width="2" opacity="0.4" />
        <polygon points="160, -10 260,-60 360,-10 260,40" fill="url(#tileBase)" stroke="#2d365e" stroke-width="2" opacity="0.4" />
      </g>
      <!-- Central Active Tile -->
      <g filter="url(#glow)">
        <polygon points="0,-70 110,-15 0,40 -110,-15" fill="url(#tileGlow)" stroke="#38bdf8" stroke-width="3" />
        <!-- Tile Bevel edge -->
        <polygon points="-110,-15 0,40 0,55 -110,0" fill="#312e81" />
        <polygon points="0,40 110,-15 110,0 0,55" fill="#1e1b4b" />
        <!-- Resonance Glyph Inside Tile -->
        <polygon points="0,-45 70,-15 0,15 -70,-15" fill="none" stroke="#f8fafc" stroke-width="2" opacity="0.9" />
        <circle cx="0" cy="-15" r="8" fill="#fbbf24" />
      </g>
    </g>
    <!-- Floating Rhythm Dust -->
    <circle cx="520" cy="280" r="3" fill="#38bdf8" opacity="0.6" filter="url(#glow)" />
    <circle cx="760" cy="270" r="4" fill="#fbbf24" opacity="0.8" filter="url(#glow)" />
    <circle cx="640" cy="230" r="2.5" fill="#ffffff" opacity="0.7" />
    <circle cx="430" cy="450" r="3" fill="#6366f1" opacity="0.5" />
    <circle cx="850" cy="460" r="3" fill="#38bdf8" opacity="0.6" />
  </svg>`;
}

function createFruitSlice() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg5" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1f223d" />
        <stop offset="60%" stop-color="#131527" />
        <stop offset="100%" stop-color="#0a0c18" />
      </radialGradient>
      <linearGradient id="blade" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(255,255,255,0)" />
        <stop offset="45%" stop-color="rgba(245, 158, 11, 0.4)" />
        <stop offset="50%" stop-color="#ffffff" />
        <stop offset="55%" stop-color="rgba(99, 102, 241, 0.8)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
      <linearGradient id="citrus" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fb923c" />
        <stop offset="100%" stop-color="#ea580c" />
      </linearGradient>
      <radialGradient id="berry" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#881337" />
      </radialGradient>
      <filter id="glow5" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg5)" />
    <!-- Dynamic Slice Arc -->
    <path d="M 200,620 Q 640,360 1080,100" fill="none" stroke="url(#blade)" stroke-width="8" filter="url(#glow5)" />
    <path d="M 240,600 Q 640,360 1040,120" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9" />
    
    <!-- Central Sliced Starfruit / Citrus Halves -->
    <!-- Top Half (floating up-right) -->
    <g transform="translate(670, 310) rotate(-15)">
      <path d="M -90,0 C -90,-80 90,-80 90,0 Z" fill="url(#citrus)" stroke="#fdba74" stroke-width="4" />
      <!-- Pulp segments -->
      <path d="M -70,-10 C -70,-60 -20,-65 -5,-15 Z" fill="#fef08a" opacity="0.9" />
      <path d="M 5,-15 C 20,-65 70,-60 70,-10 Z" fill="#fef08a" opacity="0.9" />
      <line x1="-90" y1="0" x2="90" y2="0" stroke="#ffedd5" stroke-width="3" />
    </g>
    <!-- Bottom Half (floating down-left) -->
    <g transform="translate(610, 410) rotate(15)">
      <path d="M -90,0 C -90,80 90,80 90,0 Z" fill="url(#citrus)" stroke="#ea580c" stroke-width="4" />
      <path d="M -70,10 C -70,60 -20,65 -5,15 Z" fill="#fed7aa" opacity="0.9" />
      <path d="M 5,15 C 20,65 70,60 70,10 Z" fill="#fed7aa" opacity="0.9" />
      <line x1="-90" y1="0" x2="90" y2="0" stroke="#ffedd5" stroke-width="3" />
    </g>
    
    <!-- Floating Berries & Exotic Fruit Halves -->
    <circle cx="460" cy="270" r="28" fill="url(#berry)" stroke="#fda4af" stroke-width="2" filter="url(#glow5)" />
    <circle cx="490" cy="290" r="14" fill="#fb7185" />
    <circle cx="830" cy="460" r="32" fill="url(#berry)" stroke="#fda4af" stroke-width="2" />
    <circle cx="340" cy="450" r="22" fill="#10b981" stroke="#6ee7b7" stroke-width="2" />
    <circle cx="940" cy="260" r="26" fill="#a855f7" stroke="#d8b4fe" stroke-width="2" />

    <!-- Crystalline Splash Droplets -->
    <circle cx="620" cy="330" r="6" fill="#fed7aa" filter="url(#glow5)" />
    <circle cx="660" cy="390" r="8" fill="#fdba74" filter="url(#glow5)" />
    <circle cx="710" cy="280" r="5" fill="#f43f5e" />
    <circle cx="580" cy="440" r="6" fill="#fb923c" />
    <circle cx="550" cy="360" r="4" fill="#ffffff" />
    <circle cx="750" cy="370" r="5" fill="#ffffff" />
  </svg>`;
}

function createNumberDash() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg6" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1a1c38" />
        <stop offset="60%" stop-color="#121426" />
        <stop offset="100%" stop-color="#0a0b16" />
      </radialGradient>
      <linearGradient id="speed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="50%" stop-color="#818cf8" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <linearGradient id="goldNum" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <filter id="glow6" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg6)" />
    <!-- Tunnel Acceleration Lines converging to (640, 360) -->
    <g stroke="url(#speed)" stroke-width="1.5" opacity="0.35">
      <line x1="0" y1="0" x2="640" y2="360" />
      <line x1="1280" y1="0" x2="640" y2="360" />
      <line x1="0" y1="720" x2="640" y2="360" />
      <line x1="1280" y1="720" x2="640" y2="360" />
      <line x1="640" y1="0" x2="640" y2="360" stroke-dasharray="10 15" />
      <line x1="640" y1="720" x2="640" y2="360" stroke-dasharray="10 15" />
      <line x1="0" y1="360" x2="640" y2="360" stroke-dasharray="10 15" />
      <line x1="1280" y1="360" x2="640" y2="360" stroke-dasharray="10 15" />
    </g>
    <!-- Geometric Concentric Speed Squares -->
    <rect x="520" y="290" width="240" height="140" rx="20" fill="none" stroke="#6366f1" stroke-width="2" opacity="0.4" />
    <rect x="420" y="235" width="440" height="250" rx="30" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.25" />
    <rect x="300" y="170" width="680" height="380" rx="40" fill="none" stroke="#818cf8" stroke-width="1.5" opacity="0.15" />

    <!-- Central Focal Number '7' with 3D Bevel & Light trails -->
    <g transform="translate(640, 370)" filter="url(#glow6)">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="160" font-weight="800" text-anchor="middle" fill="url(#goldNum)" stroke="#fde047" stroke-width="3">
        7
      </text>
    </g>
    <!-- Flanking Numbers in Motion '3' & '9' -->
    <g transform="translate(430, 390) scale(0.65)" opacity="0.75" filter="url(#glow6)">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="130" font-weight="700" text-anchor="middle" fill="#38bdf8">
        3
      </text>
    </g>
    <g transform="translate(850, 390) scale(0.65)" opacity="0.75" filter="url(#glow6)">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="130" font-weight="700" text-anchor="middle" fill="#818cf8">
        9
      </text>
    </g>
    <g transform="translate(530, 240) scale(0.4)" opacity="0.5">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="110" font-weight="700" text-anchor="middle" fill="#f8fafc">
        8
      </text>
    </g>
    <g transform="translate(750, 240) scale(0.4)" opacity="0.5">
      <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="110" font-weight="700" text-anchor="middle" fill="#f8fafc">
        5
      </text>
    </g>
    <!-- High speed particles -->
    <circle cx="600" cy="300" r="4" fill="#fbbf24" filter="url(#glow6)" />
    <circle cx="690" cy="420" r="5" fill="#38bdf8" filter="url(#glow6)" />
    <circle cx="560" cy="440" r="3" fill="#ffffff" />
    <circle cx="720" cy="310" r="3.5" fill="#f59e0b" />
  </svg>`;
}

function createBubblePop() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg7" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#14213d" />
        <stop offset="60%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#080d1a" />
      </radialGradient>
      <radialGradient id="bubble1" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.85)" />
        <stop offset="40%" stop-color="rgba(56, 189, 248, 0.4)" />
        <stop offset="80%" stop-color="rgba(168, 85, 247, 0.35)" />
        <stop offset="100%" stop-color="rgba(99, 102, 241, 0.6)" />
      </radialGradient>
      <radialGradient id="bubbleGold" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.9)" />
        <stop offset="45%" stop-color="rgba(251, 191, 36, 0.5)" />
        <stop offset="80%" stop-color="rgba(245, 158, 11, 0.35)" />
        <stop offset="100%" stop-color="rgba(217, 119, 6, 0.7)" />
      </radialGradient>
      <filter id="glow7" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg7)" />
    <!-- Ambient Bioluminescent Depth Orbs -->
    <circle cx="640" cy="360" r="320" fill="#1e293b" opacity="0.3" filter="url(#glow7)" />
    <circle cx="480" cy="420" r="180" fill="#312e81" opacity="0.25" filter="url(#glow7)" />
    
    <!-- Central Cluster of Floating Iridescent Bubbles -->
    <!-- Large Main Bubble -->
    <g transform="translate(640, 360)">
      <circle cx="0" cy="0" r="110" fill="url(#bubble1)" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" filter="url(#glow7)" />
      <ellipse cx="-45" cy="-45" rx="30" ry="18" fill="#ffffff" opacity="0.75" transform="rotate(-30 -45 -45)" />
      <ellipse cx="40" cy="45" rx="14" ry="7" fill="#38bdf8" opacity="0.5" />
    </g>
    <!-- Secondary Gold Reward Bubble -->
    <g transform="translate(790, 270)">
      <circle cx="0" cy="0" r="75" fill="url(#bubbleGold)" stroke="rgba(254, 240, 138, 0.8)" stroke-width="2" filter="url(#glow7)" />
      <ellipse cx="-30" cy="-30" rx="18" ry="10" fill="#ffffff" opacity="0.8" transform="rotate(-30 -30 -30)" />
    </g>
    <!-- Cyan Bubble -->
    <g transform="translate(480, 290)">
      <circle cx="0" cy="0" r="85" fill="url(#bubble1)" stroke="rgba(125, 211, 252, 0.8)" stroke-width="2" filter="url(#glow7)" />
      <ellipse cx="-35" cy="-35" rx="22" ry="12" fill="#ffffff" opacity="0.8" transform="rotate(-30 -35 -35)" />
    </g>
    <!-- Bursting Bubble with Radial Particle Splashes -->
    <g transform="translate(750, 480)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.6" />
      <circle cx="-35" cy="-25" r="5" fill="#38bdf8" filter="url(#glow7)" />
      <circle cx="35" cy="-30" r="6" fill="#818cf8" filter="url(#glow7)" />
      <circle cx="45" cy="20" r="4.5" fill="#fbbf24" filter="url(#glow7)" />
      <circle cx="-25" cy="40" r="5.5" fill="#38bdf8" />
      <circle cx="0" cy="-45" r="4" fill="#ffffff" />
      <circle cx="-45" cy="15" r="3.5" fill="#a855f7" />
    </g>
    <!-- Background Bubbles -->
    <circle cx="360" cy="460" r="48" fill="url(#bubble1)" opacity="0.55" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
    <circle cx="920" cy="410" r="54" fill="url(#bubble1)" opacity="0.6" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" />
    <circle cx="610" cy="190" r="38" fill="url(#bubbleGold)" opacity="0.65" stroke="rgba(254,240,138,0.5)" stroke-width="1.5" />
  </svg>`;
}

function createLuckySpin() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg8" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="60%" stop-color="#131131" />
        <stop offset="100%" stop-color="#0a081c" />
      </radialGradient>
      <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="40%" stop-color="#f59e0b" />
        <stop offset="70%" stop-color="#d97706" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>
      <filter id="glow8" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg8)" />
    <!-- Festive Radial Sunburst Rays -->
    <g opacity="0.12" fill="#fbbf24">
      <polygon points="640,360 540,0 740,0" />
      <polygon points="640,360 1280,240 1280,480" />
      <polygon points="640,360 740,720 540,720" />
      <polygon points="640,360 0,480 0,240" />
    </g>

    <!-- Main Central Fortune Wheel -->
    <g transform="translate(640, 360)">
      <!-- Outer Wheel Glow -->
      <circle cx="0" cy="0" r="230" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.4" filter="url(#glow8)" />
      <!-- Outer Gold Rim -->
      <circle cx="0" cy="0" r="220" fill="#181533" stroke="url(#goldRim)" stroke-width="14" />
      
      <!-- Wheel Wedges (8 segments) -->
      <g>
        <path d="M 0,0 L 0,-212 A 212,212 0 0,1 150,-150 Z" fill="#4f46e5" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L 150,-150 A 212,212 0 0,1 212,0 Z" fill="#b45309" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L 212,0 A 212,212 0 0,1 150,150 Z" fill="#047857" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L 150,150 A 212,212 0 0,1 0,212 Z" fill="#6d28d9" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L 0,212 A 212,212 0 0,1 -150,150 Z" fill="#b91c1c" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L -150,150 A 212,212 0 0,1 -212,0 Z" fill="#4338ca" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L -212,0 A 212,212 0 0,1 -150,-150 Z" fill="#d97706" stroke="#fbbf24" stroke-width="1.5" />
        <path d="M 0,0 L -150,-150 A 212,212 0 0,1 0,-212 Z" fill="#0f766e" stroke="#fbbf24" stroke-width="1.5" />
      </g>

      <!-- Center Gold Hub -->
      <circle cx="0" cy="0" r="55" fill="url(#goldRim)" stroke="#fef08a" stroke-width="3" filter="url(#glow8)" />
      <circle cx="0" cy="0" r="42" fill="#1e1b4b" stroke="#f59e0b" stroke-width="2" />
      <!-- Star in Center Hub -->
      <polygon points="0,-22 7,-7 22,0 7,7 0,22 -7,7 -22,0 -7,-7" fill="#fbbf24" />

      <!-- Top Pointer Flipper (Pointing down) -->
      <polygon points="0,-240 -16,-280 16,-280" fill="url(#goldRim)" stroke="#fef08a" stroke-width="2" filter="url(#glow8)" />
      <circle cx="0" cy="-280" r="10" fill="#fef08a" />
    </g>

    <!-- Floating Gold Coin Tokens & Confetti Particles -->
    <circle cx="340" cy="220" r="16" fill="url(#goldRim)" filter="url(#glow8)" />
    <circle cx="950" cy="240" r="20" fill="url(#goldRim)" filter="url(#glow8)" />
    <circle cx="380" cy="480" r="14" fill="url(#goldRim)" />
    <circle cx="920" cy="500" r="18" fill="url(#goldRim)" />
    <rect x="520" y="140" width="10" height="10" fill="#f43f5e" transform="rotate(25 520 140)" />
    <rect x="760" y="160" width="12" height="12" fill="#38bdf8" transform="rotate(40 760 160)" />
    <rect x="420" y="320" width="8" height="8" fill="#fbbf24" transform="rotate(15 420 320)" />
    <rect x="860" y="360" width="11" height="11" fill="#a855f7" transform="rotate(55 860 360)" />
  </svg>`;
}

function createWordSprint() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg9" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#181e3d" />
        <stop offset="60%" stop-color="#101328" />
        <stop offset="100%" stop-color="#080a14" />
      </radialGradient>
      <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient id="cubeGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
      <filter id="glow9" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg9)" />
    <!-- Dynamic Lexicon Energy Trails -->
    <path d="M 280,480 Q 480,240 640,360 T 1000,260" fill="none" stroke="#6366f1" stroke-width="2.5" opacity="0.45" filter="url(#glow9)" />
    <path d="M 360,260 Q 640,480 920,380" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.4" />

    <!-- 3D Isometric Letter Cubes -->
    <!-- Main Center Cube 'W' -->
    <g transform="translate(640, 340)" filter="url(#glow9)">
      <!-- Top Face -->
      <polygon points="0,-60 65,-25 0,10 -65,-25" fill="#38bdf8" stroke="#7dd3fc" stroke-width="2" />
      <!-- Left Face -->
      <polygon points="-65,-25 0,10 0,85 -65,50" fill="#1e40af" stroke="#3b82f6" stroke-width="2" />
      <!-- Right Face -->
      <polygon points="0,10 65,-25 65,50 0,85" fill="#172554" stroke="#1d4ed8" stroke-width="2" />
      <!-- Letter on Top -->
      <text x="0" y="-12" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="800" text-anchor="middle" fill="#ffffff">
        W
      </text>
    </g>

    <!-- Golden Cube 'S' -->
    <g transform="translate(480, 260)" filter="url(#glow9)">
      <polygon points="0,-48 52,-20 0,8 -52,-20" fill="#fde047" stroke="#fef08a" stroke-width="1.5" />
      <polygon points="-52,-20 0,8 0,68 -52,40" fill="#d97706" stroke="#f59e0b" stroke-width="1.5" />
      <polygon points="0,8 52,-20 52,40 0,68" fill="#92400e" stroke="#b45309" stroke-width="1.5" />
      <text x="0" y="-10" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#0f172a">
        S
      </text>
    </g>

    <!-- Indigo Cube 'R' -->
    <g transform="translate(800, 270)">
      <polygon points="0,-48 52,-20 0,8 -52,-20" fill="#818cf8" stroke="#a5b4fc" stroke-width="1.5" />
      <polygon points="-52,-20 0,8 0,68 -52,40" fill="#4338ca" stroke="#6366f1" stroke-width="1.5" />
      <polygon points="0,8 52,-20 52,40 0,68" fill="#312e81" stroke="#3730a3" stroke-width="1.5" />
      <text x="0" y="-10" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#ffffff">
        R
      </text>
    </g>

    <!-- Emerald Cube 'A' -->
    <g transform="translate(520, 480)">
      <polygon points="0,-42 45,-18 0,6 -45,-18" fill="#34d399" stroke="#6ee7b7" stroke-width="1.5" />
      <polygon points="-45,-18 0,6 0,60 -45,36" fill="#059669" />
      <polygon points="0,6 45,-18 45,36 0,60" fill="#065f46" />
      <text x="0" y="-8" font-family="'Plus Jakarta Sans', sans-serif" font-size="30" font-weight="800" text-anchor="middle" fill="#ffffff">
        A
      </text>
    </g>

    <!-- Rose Cube 'T' -->
    <g transform="translate(760, 470)">
      <polygon points="0,-42 45,-18 0,6 -45,-18" fill="#fb7185" stroke="#fda4af" stroke-width="1.5" />
      <polygon points="-45,-18 0,6 0,60 -45,36" fill="#e11d48" />
      <polygon points="0,6 45,-18 45,36 0,60" fill="#9f1239" />
      <text x="0" y="-8" font-family="'Plus Jakarta Sans', sans-serif" font-size="30" font-weight="800" text-anchor="middle" fill="#ffffff">
        T
      </text>
    </g>

    <!-- Kinetic Energy Specks -->
    <circle cx="640" cy="220" r="3.5" fill="#fef08a" filter="url(#glow9)" />
    <circle cx="600" cy="440" r="4" fill="#38bdf8" filter="url(#glow9)" />
    <circle cx="700" cy="450" r="3" fill="#ffffff" />
  </svg>`;
}

function createStackMaster() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg10" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#161b38" />
        <stop offset="60%" stop-color="#0f1224" />
        <stop offset="100%" stop-color="#090a14" />
      </radialGradient>
      <filter id="glow10" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg10)" />
    <!-- Pedestal Base -->
    <g transform="translate(640, 560)">
      <ellipse cx="0" cy="0" rx="260" ry="80" fill="#13172e" stroke="#2e355c" stroke-width="3" />
      <ellipse cx="0" cy="-8" rx="200" ry="60" fill="#1c2142" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
    </g>

    <!-- Stacked Architectural Modernist Blocks -->
    <!-- Block 1 (Base) -->
    <g transform="translate(640, 480)">
      <polygon points="0,-40 180,-10 0,20 -180,-10" fill="#3b82f6" stroke="#60a5fa" stroke-width="2" />
      <polygon points="-180,-10 0,20 0,60 -180,30" fill="#1d4ed8" />
      <polygon points="0,20 180,-10 180,30 0,60" fill="#1e3a8a" />
    </g>
    <!-- Block 2 -->
    <g transform="translate(640, 420)">
      <polygon points="0,-40 160,-10 0,20 -160,-10" fill="#6366f1" stroke="#818cf8" stroke-width="2" />
      <polygon points="-160,-10 0,20 0,60 -160,30" fill="#4338ca" />
      <polygon points="0,20 160,-10 160,30 0,60" fill="#312e81" />
    </g>
    <!-- Block 3 -->
    <g transform="translate(640, 360)">
      <polygon points="0,-40 140,-10 0,20 -140,-10" fill="#a855f7" stroke="#c084fc" stroke-width="2" />
      <polygon points="-140,-10 0,20 0,60 -140,30" fill="#7e22ce" />
      <polygon points="0,20 140,-10 140,30 0,60" fill="#581c87" />
    </g>
    <!-- Block 4 -->
    <g transform="translate(640, 300)">
      <polygon points="0,-40 120,-10 0,20 -120,-10" fill="#f59e0b" stroke="#fcd34d" stroke-width="2" />
      <polygon points="-120,-10 0,20 0,60 -120,30" fill="#d97706" />
      <polygon points="0,20 120,-10 120,30 0,60" fill="#92400e" />
    </g>

    <!-- Descending Top Block (Laser Alignment Phase) -->
    <g transform="translate(640, 190)" filter="url(#glow10)">
      <polygon points="0,-35 100,-8 0,18 -100,-8" fill="#38bdf8" stroke="#bae6fd" stroke-width="2" opacity="0.95" />
      <polygon points="-100,-8 0,18 0,55 -100,28" fill="#0284c7" />
      <polygon points="0,18 100,-8 100,28 0,55" fill="#0369a1" />
    </g>

    <!-- Cyan Laser Alignment Guides -->
    <line x1="540" y1="180" x2="540" y2="300" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 6" opacity="0.8" filter="url(#glow10)" />
    <line x1="740" y1="180" x2="740" y2="300" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 6" opacity="0.8" filter="url(#glow10)" />
    
    <!-- Alignment Sparkles -->
    <circle cx="540" cy="240" r="4" fill="#38bdf8" filter="url(#glow10)" />
    <circle cx="740" cy="240" r="4" fill="#38bdf8" filter="url(#glow10)" />
    <circle cx="640" cy="140" r="5" fill="#fbbf24" filter="url(#glow10)" />
  </svg>`;
}

function createTargetHit() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg11" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#141935" />
        <stop offset="60%" stop-color="#0d1024" />
        <stop offset="100%" stop-color="#080a18" />
      </radialGradient>
      <filter id="glow11" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg11)" />
    <!-- Tactical Range Grid -->
    <g stroke="#262d57" stroke-width="1.5" opacity="0.4">
      <circle cx="640" cy="360" r="320" fill="none" />
      <circle cx="640" cy="360" r="260" fill="none" stroke-dasharray="8 8" />
      <line x1="640" y1="40" x2="640" y2="680" />
      <line x1="200" y1="360" x2="1080" y2="360" />
    </g>

    <!-- Concentric Holographic Target Rings -->
    <g transform="translate(640, 360)">
      <circle cx="0" cy="0" r="200" fill="none" stroke="#6366f1" stroke-width="3" opacity="0.6" />
      <circle cx="0" cy="0" r="150" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.75" />
      <circle cx="0" cy="0" r="100" fill="none" stroke="#fbbf24" stroke-width="5" opacity="0.9" filter="url(#glow11)" />
      
      <!-- Dead Center Bullseye Hit Effect -->
      <circle cx="0" cy="0" r="45" fill="#f59e0b" filter="url(#glow11)" />
      <circle cx="0" cy="0" r="25" fill="#ffffff" />
      
      <!-- Crosshair Reticles -->
      <line x1="-60" y1="0" x2="-30" y2="0" stroke="#f8fafc" stroke-width="3" />
      <line x1="30" y1="0" x2="60" y2="0" stroke="#f8fafc" stroke-width="3" />
      <line x1="0" y1="-60" x2="0" y2="-30" stroke="#f8fafc" stroke-width="3" />
      <line x1="0" y1="30" x2="0" y2="60" stroke="#f8fafc" stroke-width="3" />

      <!-- Impact Shockwave & Spark Rays -->
      <polygon points="0,0 120,-80 140,-75" fill="#fbbf24" opacity="0.8" />
      <polygon points="0,0 -130,-70 -115,-85" fill="#38bdf8" opacity="0.8" />
      <polygon points="0,0 80,120 70,135" fill="#f59e0b" opacity="0.8" />
      <polygon points="0,0 -90,110 -105,95" fill="#818cf8" opacity="0.8" />
    </g>

    <!-- Trajectory Particles -->
    <circle cx="580" cy="300" r="4" fill="#ffffff" filter="url(#glow11)" />
    <circle cx="710" cy="310" r="5" fill="#fef08a" filter="url(#glow11)" />
    <circle cx="690" cy="430" r="4" fill="#38bdf8" filter="url(#glow11)" />
    <circle cx="570" cy="420" r="3" fill="#f59e0b" />
  </svg>`;
}

function createGemCollector() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg12" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1c1936" />
        <stop offset="60%" stop-color="#110f22" />
        <stop offset="100%" stop-color="#080712" />
      </radialGradient>
      <linearGradient id="gemEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6ee7b7" />
        <stop offset="50%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>
      <linearGradient id="gemSapphire" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#93c5fd" />
        <stop offset="50%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient id="gemRuby" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fda4af" />
        <stop offset="50%" stop-color="#f43f5e" />
        <stop offset="100%" stop-color="#9f1239" />
      </linearGradient>
      <linearGradient id="gemAmethyst" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d8b4fe" />
        <stop offset="50%" stop-color="#a855f7" />
        <stop offset="100%" stop-color="#6b21a8" />
      </linearGradient>
      <filter id="glow12" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg12)" />
    <!-- Cavern Ambient Lighting -->
    <ellipse cx="640" cy="400" rx="360" ry="160" fill="#312e81" opacity="0.35" filter="url(#glow12)" />

    <!-- Gem Cluster -->
    <!-- Large Central Emerald -->
    <g transform="translate(640, 340)" filter="url(#glow12)">
      <polygon points="0,-80 70,-35 45,65 -45,65 -70,-35" fill="url(#gemEmerald)" stroke="#a7f3d0" stroke-width="2.5" />
      <!-- Facets -->
      <polygon points="0,-80 0,0 -70,-35" fill="#34d399" opacity="0.5" />
      <polygon points="0,-80 70,-35 0,0" fill="#a7f3d0" opacity="0.75" />
      <polygon points="0,0 70,-35 45,65" fill="#059669" />
      <polygon points="0,0 45,65 -45,65" fill="#10b981" />
      <polygon points="0,0 -45,65 -70,-35" fill="#047857" />
    </g>

    <!-- Ruby (Left) -->
    <g transform="translate(480, 390)">
      <polygon points="0,-60 55,-25 35,50 -35,50 -55,-25" fill="url(#gemRuby)" stroke="#fecdd3" stroke-width="2" filter="url(#glow12)" />
      <polygon points="0,-60 55,-25 0,0" fill="#fda4af" opacity="0.75" />
      <polygon points="0,0 55,-25 35,50" fill="#e11d48" />
      <polygon points="0,0 35,50 -35,50" fill="#be123c" />
    </g>

    <!-- Sapphire (Right) -->
    <g transform="translate(800, 390)">
      <polygon points="0,-65 60,-30 40,55 -40,55 -60,-30" fill="url(#gemSapphire)" stroke="#bfdbfe" stroke-width="2" filter="url(#glow12)" />
      <polygon points="0,-65 60,-30 0,0" fill="#93c5fd" opacity="0.8" />
      <polygon points="0,0 60,-30 40,55" fill="#2563eb" />
      <polygon points="0,0 40,55 -40,55" fill="#1d4ed8" />
    </g>

    <!-- Amethyst (Foreground Lower) -->
    <g transform="translate(640, 480)">
      <polygon points="0,-45 40,-20 25,35 -25,35 -40,-20" fill="url(#gemAmethyst)" stroke="#e9d5ff" stroke-width="1.5" filter="url(#glow12)" />
      <polygon points="0,-45 40,-20 0,0" fill="#c084fc" opacity="0.8" />
      <polygon points="0,0 40,-20 25,35" fill="#9333ea" />
    </g>

    <!-- Floating Gem Dust Sparkles -->
    <polygon points="640,210 644,222 656,226 644,230 640,242 636,230 624,226 636,222" fill="#ffffff" filter="url(#glow12)" />
    <polygon points="420,310 423,319 432,322 423,325 420,334 417,325 408,322 417,319" fill="#fbbf24" filter="url(#glow12)" />
    <polygon points="860,310 863,319 872,322 863,325 860,334 857,325 848,322 857,319" fill="#38bdf8" filter="url(#glow12)" />
  </svg>`;
}

function createSpinAndWin() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <radialGradient id="bg13" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#241947" />
        <stop offset="60%" stop-color="#140e2b" />
        <stop offset="100%" stop-color="#0a0717" />
      </radialGradient>
      <linearGradient id="goldLuxe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="35%" stop-color="#f59e0b" />
        <stop offset="70%" stop-color="#d97706" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>
      <filter id="glow13" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg13)" />
    <!-- Radiating Grand Champagne Beams -->
    <g opacity="0.18" fill="#fbbf24">
      <polygon points="640,360 480,0 800,0" />
      <polygon points="640,360 1280,180 1280,540" />
      <polygon points="640,360 800,720 480,720" />
      <polygon points="640,360 0,540 0,180" />
    </g>

    <!-- Grand Radial Celebration Dial -->
    <g transform="translate(640, 360)">
      <!-- Outer Dial Aura -->
      <circle cx="0" cy="0" r="240" fill="none" stroke="#f59e0b" stroke-width="4" opacity="0.5" filter="url(#glow13)" />
      <!-- Outer Beveled Gold Ring -->
      <circle cx="0" cy="0" r="225" fill="#1b1438" stroke="url(#goldLuxe)" stroke-width="16" />
      
      <!-- Laurel / Segment Pattern -->
      <circle cx="0" cy="0" r="205" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8 12" />

      <!-- Inner Slices in Royal Purple, Crimson & Gold -->
      <g>
        <path d="M 0,0 L 0,-200 A 200,200 0 0,1 141,-141 Z" fill="#7c3aed" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L 141,-141 A 200,200 0 0,1 200,0 Z" fill="#d97706" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L 200,0 A 200,200 0 0,1 141,141 Z" fill="#dc2626" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L 141,141 A 200,200 0 0,1 0,200 Z" fill="#4f46e5" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L 0,200 A 200,200 0 0,1 -141,141 Z" fill="#9333ea" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L -141,141 A 200,200 0 0,1 -200,0 Z" fill="#b45309" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L -200,0 A 200,200 0 0,1 -141,-141 Z" fill="#b91c1c" stroke="#fef08a" stroke-width="2" />
        <path d="M 0,0 L -141,-141 A 200,200 0 0,1 0,-200 Z" fill="#4338ca" stroke="#fef08a" stroke-width="2" />
      </g>

      <!-- Center Medallion Emblem -->
      <circle cx="0" cy="0" r="65" fill="url(#goldLuxe)" stroke="#ffffff" stroke-width="3" filter="url(#glow13)" />
      <circle cx="0" cy="0" r="50" fill="#241947" stroke="#f59e0b" stroke-width="2" />
      <!-- 8-Pointed Star Medallion -->
      <polygon points="0,-28 8,-10 26,-10 12,2 17,20 0,10 -17,20 -12,2 -26,-10 -8,-10" fill="url(#goldLuxe)" />
    </g>

    <!-- Floating Medallions & Celebratory Confetti -->
    <circle cx="310" cy="200" r="22" fill="url(#goldLuxe)" filter="url(#glow13)" />
    <circle cx="970" cy="210" r="26" fill="url(#goldLuxe)" filter="url(#glow13)" />
    <circle cx="360" cy="510" r="18" fill="url(#goldLuxe)" />
    <circle cx="940" cy="520" r="24" fill="url(#goldLuxe)" />
    <!-- Confetti Ribbons -->
    <path d="M 440,160 Q 460,200 480,180" fill="none" stroke="#fbbf24" stroke-width="3" />
    <path d="M 820,150 Q 840,190 860,170" fill="none" stroke="#f43f5e" stroke-width="3" />
    <path d="M 400,380 Q 420,410 440,390" fill="none" stroke="#38bdf8" stroke-width="3" />
    <path d="M 880,390 Q 900,420 920,400" fill="none" stroke="#a855f7" stroke-width="3" />
  </svg>`;
}

const generators = {
  'game-04': createTileTap,
  'game-05': createFruitSlice,
  'game-06': createNumberDash,
  'game-07': createBubblePop,
  'game-08': createLuckySpin,
  'game-09': createWordSprint,
  'game-10': createStackMaster,
  'game-11': createTargetHit,
  'game-12': createGemCollector,
  'game-13': createSpinAndWin
};

for (const [id, gen] of Object.entries(generators)) {
  const svg = gen();
  fs.writeFileSync(path.join(process.cwd(), 'scratch', `${id}.svg`), svg);
  console.log(`Generated SVG for ${id}`);
}
