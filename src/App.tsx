import { useState } from "react";
import Game from "./components/game/Game";
import MainMenu from "./components/main-menu/MainMenu";
import { Difficulty } from "./utils/Models";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleBackToMenu = () => {
    setIsGameStarted(false);
  };

  if (isGameStarted) {
    return <Game difficulty={difficulty} onBackToMenu={handleBackToMenu} />;
  }

  return (
    <MainMenu
      difficulty={difficulty}
      onDifficultyChange={setDifficulty}
      onStartGame={handleStartGame}
    />
  );
}

export default App;
