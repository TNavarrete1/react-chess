// Utilites
import { getBoardPositions, getBoardSquare } from "utilities/board";
// Components
import { useRef, useState, useEffect, useCallback, memo } from "react";

function DraggableElement({
  boardOrientation,
  sourceSquare,
  targetSquare,
  pieceName,
  pieceColor,
  canMovePieces,
  // Functions
  onPieceDrop,
  onSquareHover,
  activateSelectedPieceEffects,
  deactivateSelectedPieceEffects,
  chessBoard,
}) {
  // Tracks piece movement
  const [draggingState, setdraggingState] = useState({
    draggingClass: "",
    isOutOfBounds: false,
    posX: getBoardPositions(boardOrientation)[sourceSquare].location.posX,
    posY: getBoardPositions(boardOrientation)[sourceSquare].location.posY,
  });
  // Stores square (e.g. a6)
  const [currSquare, setCurrSquare] = useState(targetSquare);
  const piece = useRef();
  const touchObject = useRef();

  // Helper functions
  const getElOffsets = (el) => {
    const offsets = { left: 0, top: 0 };
    const borderSize = parseInt(
      getComputedStyle(el).getPropertyValue("border-width").slice(0, -2)
    );

    let tmpEl;
    // Get parent offsets
    tmpEl = el;
    while (tmpEl) {
      // Empty space
      offsets.left += parseInt(tmpEl.offsetLeft);
      offsets.top += parseInt(tmpEl.offsetTop);
      tmpEl = tmpEl.offsetParent;
    }

    // Get root Scroll (overflow)
    offsets.left -= parseInt(document.querySelector("#root").scrollLeft);
    offsets.top -= parseInt(document.querySelector("#root").scrollTop);

    // Get window Scroll
    offsets.left -= parseInt(window.scrollX);
    offsets.top -= parseInt(window.scrollY);

    // Get chess border widths if any
    offsets.left += borderSize;
    offsets.top += borderSize;

    return offsets;
  };

  // Runs when piece is moved outside of chessboard
  const handleOutOfBounds = () => {
    setdraggingState((prev) => {
      // Piece is not being dragged
      if (!prev.isDragging) {
        return prev;
      }

      // Piece was being dragged out of bounds
      prev.isOutOfBounds = true;
      return { ...prev };
    });
  };
  // Runs when piece is moved inside of chessboard
  const handleInBounds = () => {
    setdraggingState((prev) => {
      // Piece is not being dragged
      if (!prev.isDragging) {
        return prev;
      }

      // Piece was being dragged in bounds
      prev.isOutOfBounds = false;
      return { ...prev };
    });
  };

  const onDrag = useCallback(
    (e) => {
      // Prevents text selection during drag
      e.preventDefault();
      if (e.type === "touchmove") {
        touchObject.current = e.targetTouches[0];
      }

      // Get square being hovered over and active hover effect
      const singlesquareSizePx = chessBoard.current.clientWidth / 8;
      const singlesquareSizePercent = 12.5;
      const chessBoardOffsets = getElOffsets(chessBoard.current);
      const squarePosX =
        Math.floor(
          ((e.clientX || touchObject.current.clientX) -
            chessBoardOffsets.left) /
            singlesquareSizePx
        ) * singlesquareSizePercent;
      const squarePosY =
        Math.floor(
          ((e.clientY || touchObject.current.clientY) - chessBoardOffsets.top) /
            singlesquareSizePx
        ) * singlesquareSizePercent;
      const sourceSquare = getBoardSquare(
        boardOrientation,
        squarePosX,
        squarePosY
      );
      if (e.type === "touchmove") {
        onSquareHover(sourceSquare, true); // Activate square highlight and circular indicator for touch event
      } else {
        onSquareHover(sourceSquare); // Activate square highlight
      }

      // Get mouse location relative to chessboard
      const halfOfPieceSizePercent = 6.25;
      let posX =
        (((e.clientX || touchObject.current.clientX) - chessBoardOffsets.left) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSizePercent;
      let posY =
        (((e.clientY || touchObject.current.clientY) - chessBoardOffsets.top) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSizePercent;

      // Snap piece lower on phones
      if (e.type === "touchmove") {
        posY -= 8;
      }

      // Keep location in bounds of chessboard
      const maxPosX = 93.5;
      const minPosX = -6;
      const maxPosY = 92;
      const minPosY = -4.5;
      if (posX < minPosX) {
        posX = minPosX;
      } else if (posX > maxPosX) {
        posX = maxPosX;
      }
      if (posY < minPosY) {
        posY = minPosY;
      } else if (posY > maxPosY) {
        posY = maxPosY;
      }

      // Move chess piece to location
      setdraggingState((prev) => {
        prev.posX = posX;
        prev.posY = posY;
        return { ...prev };
      });
    },
    [chessBoard, boardOrientation, onSquareHover]
  );

  const onDragDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (e.type === "touchend") {
        document.querySelector("body").classList.remove("lock-screen");
      }

      // Remove window mouse event
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("mouseup", onDragDrop);
      window.removeEventListener("touchend", onDragDrop);

      // Get position of square where chess piece is dropped
      const singlesquareSizePx = chessBoard.current.clientWidth / 8;
      const singlesquareSizePercent = 12.5;
      const chessBoardOffsets = getElOffsets(chessBoard.current);
      const posX =
        Math.floor(
          ((e.clientX || touchObject.current.clientX) -
            chessBoardOffsets.left) /
            singlesquareSizePx
        ) * singlesquareSizePercent;
      const posY =
        Math.floor(
          ((e.clientY || touchObject.current.clientY) - chessBoardOffsets.top) /
            singlesquareSizePx
        ) * singlesquareSizePercent;

      /*
            Attempt to move. Deactivate square hover effect because piece dragging is over.
            Deactivate selected piece effects when move was valid or when piece was dragged
            to current square.
      */
      onSquareHover(""); // Removes square hover effect
      const targetSquare = getBoardSquare(boardOrientation, posX, posY);
      const move = onPieceDrop(currSquare, targetSquare, {
        pieceName,
        pieceColor,
      });
      // Move was valid
      if (move) {
        deactivateSelectedPieceEffects(targetSquare); // Removes possible moves and highlighted square
        return;
      }
      if (targetSquare === currSquare) {
        deactivateSelectedPieceEffects(targetSquare); // Removes possible moves and highlighted square
      }

      // Move was invalid, move piece to original position and reset isDragging and isOutOfBounds
      setdraggingState((prev) => {
        prev.draggingClass = "";
        prev.isOutOfBounds = false;
        prev.posX =
          getBoardPositions(boardOrientation)[currSquare].location.posX;
        prev.posY =
          getBoardPositions(boardOrientation)[currSquare].location.posY;
        return { ...prev };
      });
    },
    [
      boardOrientation,
      chessBoard,
      currSquare,
      onDrag,
      onPieceDrop,
      onSquareHover,
      deactivateSelectedPieceEffects,
      pieceColor,
      pieceName,
    ]
  );

  const onDragStart = useCallback(
    (e) => {
      e.preventDefault(); // Prevents text selection on drag and touch effects
      // Check if pieces are activated
      if (!canMovePieces) {
        return;
      }

      if (e.type === "touchstart") {
        document.querySelector("body").classList.add("lock-screen");
        touchObject.current = e.targetTouches[0];
      }

      // Window events to track drag and drop outside of chessboard
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("touchmove", onDrag, { passive: false });
      window.addEventListener("mouseup", onDragDrop);
      window.addEventListener("touchend", onDragDrop, { passive: false });

      if (e.type === "touchstart") {
        onSquareHover(currSquare, true); // Activate square highlight and circular indicator for touch event
      } else {
        onSquareHover(currSquare); // Activate square highlight
      }
      activateSelectedPieceEffects(currSquare, { pieceName, pieceColor }); // Activate possible moves effect

      // Snap piece position to Mouse
      const chessBoardOffsets = getElOffsets(chessBoard.current);
      const halfOfPieceSize = 6.25;
      const posX =
        (((e.clientX || touchObject.current.clientX) - chessBoardOffsets.left) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSize;
      let posY =
        (((e.clientY || touchObject.current.clientY) - chessBoardOffsets.top) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSize;

      // Snap piece lower on phones
      if (e.type === "touchstart") {
        posY -= 8;
      }

      // Update dragging sate
      setdraggingState((prev) => {
        if (e.type === "mousedown") {
          prev.draggingClass = "mouse-drag";
        } else if (e.type === "touchstart") {
          prev.draggingClass = "touch-drag";
        }
        prev.posX = posX;
        prev.posY = posY;
        return { ...prev };
      });
    },
    [
      activateSelectedPieceEffects,
      currSquare,
      canMovePieces,
      chessBoard,
      onDrag,
      onDragDrop,
      onSquareHover,
      pieceColor,
      pieceName,
    ]
  );

  useEffect(() => {
    const currPiece = piece.current;
    currPiece.addEventListener("touchstart", onDragStart, {
      passive: false,
    });

    return () => {
      currPiece.removeEventListener("touchstart", onDragStart);
    };
  }, [onDragStart]);

  useEffect(() => {
    setdraggingState((prev) => {
      prev.posX =
        getBoardPositions(boardOrientation)[targetSquare].location.posX;
      prev.posY =
        getBoardPositions(boardOrientation)[targetSquare].location.posY;
      return { ...prev };
    });
    setCurrSquare((prev) => {
      return targetSquare;
    });
  }, [boardOrientation, targetSquare]);

  return (
    <div
      ref={piece}
      // Classes
      className={`piece-img ${
        pieceName && pieceColor ? `${pieceColor}${pieceName}` : ""
      } ${draggingState.draggingClass}`}
      // Inline Styles
      style={{
        top: `${draggingState.posY}%`,
        left: `${draggingState.posX}%`,
      }}
      // Data
      data-square={targetSquare}
      // Event Callbacks
      onMouseDown={onDragStart}
      onMouseLeave={handleOutOfBounds}
      onMouseEnter={handleInBounds}
    ></div>
  );
}

export default memo(DraggableElement);
