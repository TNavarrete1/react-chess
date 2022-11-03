// Hooks

// Utilites
import { initBoard } from "utilities/board";
// Styles
import "components/ChessBoard/ChessBoard.css";
// React components
import { useRef } from "react";
import DraggableElement from "components/ChessBoard/DraggableElement";

function ChessBoard({ id }) {
  const chessBoard = useRef();

  return (
    <div id={id} className="bg-tan" ref={chessBoard}>
      {initBoard &&
        initBoard.map((cell) => {
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
