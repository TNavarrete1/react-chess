// Styles
import "components/GameTracker/GameTracker.css";
// Components
import MoveHistory from "components/GameTracker/MoveHistory";
import GameController from "components/GameTracker/GameController";
import GameHeaders from "components/GameTracker/GameHeaders";

export default function GameTracker({
  moveHistory,
  moveNum,
  resetGame,
  handleBoardFlip,
  previewPosition,
}) {
  return (
    <div id="move-history-wrapper">
      <GameHeaders resetGame={resetGame} />
      <MoveHistory
        moveHistory={moveHistory}
        moveNum={moveNum}
        previewPosition={previewPosition}
      />
      <GameController
        moveHistory={moveHistory}
        moveNum={moveNum}
        handleBoardFlip={handleBoardFlip}
        previewPosition={previewPosition}
      />
    </div>
  );
}
