// Styles
import "components/ChessBoard/ChessBoard.css";
// React components
import { useRef, useState, useEffect } from "react";
import DraggableElement from "components/ChessBoard/DraggableElement";
import AxesLables from "./AxesLabels";

function ChessBoard({
  boardOrientation,
  isBoardInactive,
  position,
  theme,
  onPieceDrop,
}) {
  const chessBoard = useRef();
  const [board, setBoard] = useState(position);

  useEffect(() => {
    setBoard(position);
  }, [position]);

  return (
    <div id="chess-board" className="bg-tan" ref={chessBoard}>
      {
        /******************************************************
            Inactive Board Modal
        ************************************************* */
        isBoardInactive && <div id="board-modal"></div>
        /***************************************************
            Inactive Board Modal
        **************************************************** */
      }
      <AxesLables boardOrientation={boardOrientation} theme={theme} />
      {
        /******************************************************
            Board Pieces
        ************************************************* */
        board &&
          board.map((row) => {
            if (!row) return null;

            // Iterate through each row
            return row.map((square) => {
              if (!square) return null;

              // Return Draggable piece
              const piece = `${square.color}${square.type}`;
              return (
                <DraggableElement
                  key={square.square}
                  boardOrientation={boardOrientation}
                  square={square.square}
                  piece={piece}
                  onPieceDrop={onPieceDrop}
                  chessBoard={chessBoard}
                />
              );
            });
          })
        /***************************************************
            Board Pieces
        **************************************************** */
      }
    </div>
  );
}

export default ChessBoard;
