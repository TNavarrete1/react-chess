// Hooks

// Utilites
import { initBoard } from "utilities/board";
// Styles
import "components/ChessBoard/ChessBoard.css";
// React components
import { useRef, useState, useEffect } from "react";
import DraggableElement from "components/ChessBoard/DraggableElement";

function ChessBoard({ id, team, gameMode, gameStart, gameOver }) {
  const chessBoard = useRef();
  const [board, setBoard] = useState();

  useEffect(() => {
    setBoard(initBoard(team));
  }, [team]);

  return (
    <div id={id} className="bg-tan" ref={chessBoard}>
      {!gameStart && <div id="board-modal"></div>}
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
