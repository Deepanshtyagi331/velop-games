import PageContainer from '../../components/common/PageContainer';
import GameHome from '../../components/games/GameHome';
import GAMES_DATA from '../../data/gamesData';

export default function GameOnePage() {
  const game = GAMES_DATA.find((g) => g.slug === 'coin-catcher') || GAMES_DATA[0];

  return (
    <PageContainer>
      <GameHome game={game} />
    </PageContainer>
  );
}
