// Styles
import "root.css";
import "App.css";
// Components
import { useState } from "react";
import ChessBoard from "components/ChessBoard/ChessBoard";
import GameOptions from "components/GameOptions/GameOptions";
import MoveHistory from "components/MoveHistory/MoveHistory";

function App() {
  const [gameState, setGameState] = useState({
    team: "white",
    gameMode: null,
    gameStart: false,
    gameOver: false,
  });

  const chooseTeam = (team) => {
    setGameState((prev) => {
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

  const startGame = (gameStarted) => {
    setGameState((prev) => {
      prev.gameStart = true;
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
      {gameState.gameStart ? (
        <MoveHistory />
      ) : (
        <GameOptions
          id="game-options"
          team={gameState.team}
          gameMode={gameState.gameMode}
          handleTeamOption={chooseTeam}
          handleGameMode={chooseGameMode}
          handleStartGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
