// Styles
import "components/ChessBoard/PossibleMoves.css";
// Utilites
import { getBoardPositions } from "utilities/board";
// Components
import { useState, useEffect } from "react";

function PossibleMoves({
  width,
  boardOrientation,
  possibleMoves,
  square,
  onPieceDrop,
  deactivateSelectedPieceEffects,
}) {
  const [position, setPosition] = useState();
  const [squarePos, setSquarePos] = useState();

  useEffect(() => {
    const position = possibleMoves.map((square) => {
      return {
        ...getBoardPositions(boardOrientation)[square.to].location,
        ...square,
      };
    });
    const squarePos = getBoardPositions(boardOrientation)[square].location;

    setPosition(position);
    setSquarePos(squarePos);
  }, [boardOrientation, possibleMoves, square]);

  const moveToSquare = (e) => {
    const sourceSquare = e.currentTarget.dataset.sourceSquare;
    const targetSquare = e.currentTarget.dataset.targetSquare;
    const pieceName = e.currentTarget.dataset.pieceName;
    const pieceColor = e.currentTarget.dataset.pieceColor;

    onPieceDrop(sourceSquare, targetSquare, { pieceName, pieceColor });
    deactivateSelectedPieceEffects();
  };

  return (
    <>
      {squarePos && (
        <div
          className="highlight-square"
          style={{ top: `${squarePos.posY}%`, left: `${squarePos.posX}%` }}
        ></div>
      )}
      {position &&
        position.map((square) => {
          return (
            <div
              key={JSON.stringify(square)}
              className="possible-move-wrapper"
              style={{ top: `${square.posY}%`, left: `${square.posX}%` }}
              data-source-square={square.from}
              data-target-square={square.to}
              data-piece-name={square.piece}
              data-piece-color={square.color}
              onClick={moveToSquare}
              onTouchStart={moveToSquare}
            >
              <div
                className={`possible-move-${
                  square.captured ? "capture-" : ""
                }hint`}
                style={
                  square.captured && {
                    "--border-thickness": `${width * 0.0125}px`,
                  }
                }
              ></div>
            </div>
          );
        })}
    </>
  );
}

export default PossibleMoves;
