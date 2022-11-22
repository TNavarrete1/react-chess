// Utilites
import { getBoardPositions } from "utilities/board";
// Styles
import "components/ChessBoard/MovementAfterEffect.css";
// Components
import { useEffect, useState } from "react";

function MovementAfterEffect({ boardOrientation, sourceSquare, targetSquare }) {
  const [position, setPosition] = useState();

  useEffect(() => {
    const position = [
      {
        ...getBoardPositions(boardOrientation)[sourceSquare].location,
        square: sourceSquare,
      },
      {
        ...getBoardPositions(boardOrientation)[targetSquare].location,
        square: targetSquare,
      },
    ];

    setPosition(position);
  }, [boardOrientation, sourceSquare, targetSquare]);

  return (
    <>
      {position &&
        position.map((currSquare) => {
          return (
            <div
              key={currSquare.square}
              className="move-after-effect"
              style={{
                top: `${currSquare.posY}%`,
                left: `${currSquare.posX}%`,
              }}
            ></div>
          );
        })}
    </>
  );
}

export default MovementAfterEffect;
