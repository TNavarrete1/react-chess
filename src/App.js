// Styles
import "root.css";
import "App.css";
// Components
import { useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "components/ChessBoard/ChessBoard";
import GameOptions from "components/GameOptions/GameOptions";
import MoveHistory from "components/MoveHistory/MoveHistory";

function App() {
  const [boardOrientation, setBoardOrientation] = useState("white"); // Handles board orientation
  const [game, setGame] = useState(new Chess()); // Chess rules and logic

  const handleClick = () => {
    if (boardOrientation === "white") {
      setBoardOrientation("black");
    } else {
      setBoardOrientation("white");
    }
  };

  const handlePieceMove = (sourceSquare, targetSquare) => {
    let move = null;
    setGame((prev) => {
      move = prev.move({ from: sourceSquare, to: targetSquare });
      return new Chess(prev.fen());
    });
    // Move wasn't valid
    if (move === null) {
      return false;
    }
    return true;
  };

  return (
    <div id="layout">
      <ChessBoard
        boardOrientation={boardOrientation}
        isBoardInactive={false}
        position={game.board()}
        theme="tan"
        onPieceDrop={handlePieceMove}
      />
      <button onClick={handleClick}>Flip board</button>
      {/* <div id="side-card">
        {gameState.gameStart ? (
          <MoveHistory />
        ) : (
          <GameOptions
            team={gameState.boardOrientation}
            gameMode={gameState.gameMode}
            handleTeamOption={chooseTeam}
            handleGameMode={chooseGameMode}
            handleStartGame={startGame}
          />
        )}
      </div> */}
    </div>
  );
}

export default App;
