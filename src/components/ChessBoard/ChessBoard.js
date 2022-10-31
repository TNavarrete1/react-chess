// Hooks
import useBoard from "hooks/useBoard";
// Utilites
import { boardThemes, initBoard } from "utilities/board";
// React components
// import { useEffect, useState, useCallback } from "react";

function ChessBoard({ id }) {
  const [board, handlePlayerChange, handlePlayerMove] = useBoard({ initBoard });

  const handleClick = (event) => {
    if (event.currentTarget.dataset.team === "white") {
      handlePlayerChange("black");
    } else {
      handlePlayerChange("white");
    }
  };

  return (
    <div
      id={id}
      style={{
        backgroundImage: `url(${boardThemes.board_tan})`,
        backgroundSize: "cover",
      }}
    >
      {board &&
        board.map((row) => {
          return row.map((cell) => {
            return (
              <div
                key={cell.location}
                className="piece"
                data-team={cell.team}
                onClick={handleClick}
              >
                <div
                  className={`piece-img ${cell ? cell.piece : ""}`}
                  draggable="true"
                ></div>
              </div>
            );
          });
        })}
    </div>
  );
}

export default ChessBoard;
