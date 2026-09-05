import PageContainer from '../../components/common/PageContainer';
import GameHome from '../../components/games/GameHome';
import GAMES_DATA from '../../data/gamesData';

export default function GameTwoPage() {
  const game = GAMES_DATA.find((g) => g.slug === 'memory-match') || GAMES_DATA[1];

  return (
    <PageContainer>
      <GameHome game={game} />
    </PageContainer>
  );
}
