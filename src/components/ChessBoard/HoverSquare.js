// Styles
import "components/ChessBoard/HoverSquare.css";
// Utilites
import { getBoardPositions } from "utilities/board";
// Componenets
import { useState, useEffect } from "react";

function HoverSquare({ boardOrientation, hoverSquare, touchDrag }) {
  const [position, setPosition] = useState(
    getBoardPositions(boardOrientation)[hoverSquare].location
  );

  useEffect(() => {
    setPosition(getBoardPositions(boardOrientation)[hoverSquare].location);
  }, [boardOrientation, hoverSquare]);

  return (
    <>
      {touchDrag ? (
        <div
          id="touch-hover-square"
          style={{
            top: `${position.posY}%`,
            left: `${position.posX}%`,
          }}
        ></div>
      ) : (
        <div
          id="hover-square"
          style={{
            top: `${position.posY}%`,
            left: `${position.posX}%`,
          }}
        ></div>
      )}
    </>
  );
}

export default HoverSquare;
