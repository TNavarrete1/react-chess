// Hooks

// Utilites
import { getBoardPieces, getAxesLabels } from "utilities/board";
// Styles
import "components/ChessBoard/ChessBoard.css";
// React components
import { useRef, useState, useEffect } from "react";
import DraggableElement from "components/ChessBoard/DraggableElement";

function ChessBoard({ id, team, gameMode, gameStart, gameOver }) {
  const chessBoard = useRef();
  const [board, setBoard] = useState();
  const [axesLabels, setAxesLabels] = useState();

  useEffect(() => {
    let teamInput = team;
    if (team === "random") {
      teamInput = Math.floor(Math.random() * 2) === 0 ? "white" : "black";
    }
    setAxesLabels(getAxesLabels(teamInput, "color-tan"));
    setBoard(getBoardPieces(teamInput));
  }, [team]);

  return (
    <div id={id} className="bg-tan" ref={chessBoard}>
      {!gameStart && <div id="board-modal"></div>}
      {axesLabels &&
        axesLabels.map((axesLabel) => {
          return (
            <div
              key={axesLabel.id}
              className="board-axes-labels"
              style={{
                top: `${axesLabel.location.posY}%`,
                left: `${axesLabel.location.posX}%`,
              }}
            >
              {axesLabel.id}
            </div>
          );
        })}
      {board &&
        board.map((cell) => {
          return (
            <DraggableElement
              key={cell.id}
              cell={cell}
              chessBoard={chessBoard}
            />
          );
        })}
    </div>
  );
}

export default ChessBoard;
