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
    if (
      move.piece === pieceName.toLowerCase() &&
      move.san.indexOf(pieceName) !== -1
    ) {
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

  // Helper functions
  const renderMove = (move, index) => {
    const pieceIconIndex = getPieceNameIndexInSan(move);
    let moveSanContent = move.san;
    if (pieceIconIndex !== -1) {
      moveSanContent = (
        <>
          {move.san.substr(0, pieceIconIndex)}
          <FontAwesomeIcon
            icon={pieceNameToIcon(move.piece, move.color)}
            style={{ marginRight: "3px" }}
          />
          {move.san.substr(pieceIconIndex + 1, move.san.length)}
        </>
      );
    }
    const moveComponent = (
      <span
        className={`move ${moveNum === index + 1 ? "active-move" : ""} ${
          moveHistory.length > 1 ? " move-clickable" : ""
        }`}
        data-move={index + 1}
        onClick={moveHistory.length > 1 ? previewPastMove : null}
      >
        <span className="move-san">{moveSanContent}</span>
      </span>
    );

    return moveComponent;
  };

  const renderMoves = (moveHistory) => {
    // Transformes move history into rows of move pairs
    const moveRows = [];
    for (let row = 0; row < Math.ceil(moveHistory.length / 2); row++) {
      const startingIndex = row * 2;
      const endingIndex = startingIndex + 2;
      // Gets pairs for a row
      moveRows.push(moveHistory.slice(startingIndex, endingIndex));
    }

    // Moves components
    const moves = moveRows.map((move, index) => {
      return (
        <div key={JSON.stringify({ ...move, index })} className="move-row">
          <span className="move-num">{index + 1}</span>
          {renderMove(move[0], index * 2)}
          {move[1] && renderMove(move[1], index * 2 + 1)}
        </div>
      );
    });

    return moves;
  };

  return (
    <div ref={movesViewer} id="moves-viewer">
      <header>Move History</header>
      <div id="move-list">{moveHistory && renderMoves(moveHistory)}</div>
    </div>
  );
}

export default MoveHistory;
