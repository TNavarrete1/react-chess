import { useState, useCallback } from "react";

function useBoard({ initBoard, currPlayer }) {
  const [board, setBoard] = useState(initBoard);
  console.log("ran");

  const handlePlayerChange = useCallback(
    (player) => {
      if (player === "white") {
        setBoard(board);
      } else {
        setBoard(
          board.reverse().map((row) => {
            return row.reverse().map((cell) => {
              return cell;
            });
          })
        );
      }
    },
    [board]
  );

  const handlePlayerMove = () => {};

  return [board, handlePlayerChange, handlePlayerMove];
}

export default useBoard;
