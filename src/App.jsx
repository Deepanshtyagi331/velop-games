import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EconomyProvider } from './context/EconomyContext';
import AppNavigation from './components/navigation/AppNavigation';
import HomePage from './pages/Home/HomePage';
import GamesPage from './pages/Games/GamesPage';
import GameOnePage from './pages/GameOne/GameOnePage';
import GameTwoPage from './pages/GameTwo/GameTwoPage';
import CoinCatcherGame from './games/coinCatcher/CoinCatcherGame';
import MemoryMatchGame from './games/memoryMatch/MemoryMatchGame';
import RedemptionPage from './pages/Redemption/RedemptionPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import GameHomePage from './pages/GameHome/GameHomePage';

function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppNavigation />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          
          {/* Playable Game 1: Coin Catcher & Active Gameplay */}
          <Route path="/games/coin-catcher" element={<GameOnePage />} />
          <Route path="/games/coin-catcher/play" element={<CoinCatcherGame />} />
          <Route path="/games/game-1" element={<Navigate to="/games/coin-catcher" replace />} />

          {/* Playable Game 2: Memory Match & Active Gameplay */}
          <Route path="/games/memory-match" element={<GameTwoPage />} />
          <Route path="/games/memory-match/play" element={<MemoryMatchGame />} />
          <Route path="/games/game-2" element={<Navigate to="/games/memory-match" replace />} />

          {/* 11 Banner Arcade Titles Route */}
          <Route path="/games/:gameSlug" element={<GameHomePage />} />

          <Route path="/redeem" element={<RedemptionPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <footer
        role="contentinfo"
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-4) var(--space-6)',
          textAlign: 'center',
          color: 'var(--color-text-subtle)',
          fontSize: 'var(--font-size-caption)'
        }}
      >
        <p style={{ margin: 0, color: 'inherit' }}>
          &copy; 2026 VELOOP Rewards &bull; All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <EconomyProvider>
        <AppLayout />
      </EconomyProvider>
    </BrowserRouter>
  );
}
