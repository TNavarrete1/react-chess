// Styles
import "components/GameTracker/MoveHistory.css";
// Components
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKing as fasChessKing,
  faChessQueen as fasChessQueen,
  faChessKnight as fasChessKnight,
  faChessBishop as fasChessBishop,
  faChessRook as fasChessRook,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChessKing as farChessKing,
  faChessQueen as farChessQueen,
  faChessKnight as farChessKnight,
  faChessBishop as farChessBishop,
  faChessRook as farChessRook,
} from "@fortawesome/free-regular-svg-icons";

// Helper functions
const pieceNameToIcon = (pieceName, pieceColor) => {
  const pieceNameTable = {
    K: farChessKing,
    k: fasChessKing,
    Q: farChessQueen,
    q: fasChessQueen,
    N: farChessKnight,
    n: fasChessKnight,
    B: farChessBishop,
    b: fasChessBishop,
    R: farChessRook,
    r: fasChessRook,
  };

  // Transform black piece names to corresponding capitilization
  if (pieceColor === "b") {
    pieceName = pieceName.toUpperCase();
  }

  return pieceNameTable[pieceName];
};
const getPieceNameIndexInSan = (move) => {
  // Piece is a pawn so doesn't have a name identifer in san string
  if (move.piece === "p") return -1;

  const pieceNameList = ["K", "k", "Q", "q", "N", "n", "B", "b", "R", "r"];
  let pieceNameIndex = -1;

  // Look for piece name index in san string
  for (let pieceName of pieceNameList) {
    if (move.san.indexOf(pieceName) !== -1) {
      pieceNameIndex = move.san.indexOf(pieceName);
      break;
    }
  }

  return pieceNameIndex;
};

function MoveHistory({ moveHistory, moveNum, previewPosition }) {
  const movesViewer = useRef();

  useEffect(() => {
    movesViewer.current.scrollTop =
      movesViewer.current.scrollHeight - movesViewer.current.clientHeight;
  }, [moveHistory]);

  const previewPastMove = (e) => {
    const moveNum = parseInt(e.currentTarget.dataset.move);
    previewPosition(moveNum);
  };

  return (
    <div ref={movesViewer} id="moves-viewer">
      <header>Move History</header>
      <div id="move-list-bg">
        {moveHistory &&
          moveHistory.map((move, index) => {
            if (index % 2 === 1) return null;
            return (
              <div
                key={JSON.stringify({ ...move, index })}
                className={
                  (Math.floor(index / 2) + 1) % 2 === 0
                    ? "even-round"
                    : "odd-round"
                }
              ></div>
            );
          })}
      </div>
      <div id="move-list">
        {moveHistory &&
          moveHistory.map((move, index) => {
            return (
              <div key={JSON.stringify({ ...move, index })} className="move">
                <span>
                  {index % 2 === 0 && `${Math.floor(index / 2) + 1}.`}
                </span>
                <span
                  className={`move-san${
                    moveHistory.length > 1 ? " move-san-clickable" : ""
                  }${moveNum === index + 1 ? " active-move-san" : ""}`}
                  data-move={index + 1}
                  onClick={moveHistory.length > 1 ? previewPastMove : null}
                >
                  {getPieceNameIndexInSan(move) !== -1 ? (
                    <>
                      {move.san.substr(0, getPieceNameIndexInSan(move))}
                      <FontAwesomeIcon
                        icon={pieceNameToIcon(move.piece, move.color)}
                        style={{ marginRight: "3px" }}
                      />
                      {move.san.substr(
                        getPieceNameIndexInSan(move) + 1,
                        move.san.length
                      )}
                    </>
                  ) : (
                    move.san
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MoveHistory;
