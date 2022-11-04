// Styles
import "root.css";
import "App.css";
// Components
import { useState } from "react";
import ChessBoard from "components/ChessBoard/ChessBoard";
import GameOptions from "components/GameOptions/GameOptions";

function App() {
  const [gameState, setGameState] = useState({
    team: "white",
    gameMode: null,
    gameStart: false,
    gameOver: false,
  });

  const chooseTeam = (team) => {
    setGameState((prev) => {
      prev.gameStart = true;
      prev.team = team;
      return { ...prev };
    });
  };

  const chooseGameMode = (gameMode) => {
    setGameState((prev) => {
      prev.gameMode = gameMode;
      return { ...prev };
    });
  };

  return (
    <div id="layout">
      <ChessBoard
        id="chess-board"
        team={gameState.team}
        gameMode={gameState.gameMode}
        gameStart={gameState.gameStart}
        gameOver={gameState.gameOver}
      />
      <GameOptions
        id="game-options"
        handleTeamOption={chooseTeam}
        handleGameMode={chooseGameMode}
      />
    </div>
  );
}

export default App;
