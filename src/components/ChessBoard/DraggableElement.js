// Utilites
import { getBoardPositions, getBoardSquare } from "utilities/board";
// Components
import { useState, useEffect, useCallback } from "react";

function DraggableElement({
  boardOrientation,
  square,
  piece,
  onPieceDrop,
  chessBoard,
}) {
  // Tracks piece movement
  const [draggingState, setdraggingState] = useState({
    isDragging: false,
    isOutOfBounds: false,
    posX: getBoardPositions(boardOrientation)[square].location.posX,
    posY: getBoardPositions(boardOrientation)[square].location.posY,
  });
  // Stores square (e.g. a6)
  const [currSquare, setCurrSquare] = useState(square);

  useEffect(() => {
    setdraggingState((prev) => {
      prev.posX = getBoardPositions(boardOrientation)[square].location.posX;
      prev.posY = getBoardPositions(boardOrientation)[square].location.posY;
      return { ...prev };
    });
  }, [boardOrientation, square]);

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

  const onWindowDrop = () => {
    // Remove window mouse event
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", onWindowDrop);

    setdraggingState((prev) => {
      // Piece is still in bounds
      if (!prev.isOutOfBounds) {
        return prev;
      }

      // Piece is out of bounds: move back and reset isDragging and isOutOfBounds
      prev.isDragging = false;
      prev.isOutOfBounds = false;
      prev.posX = getBoardPositions(boardOrientation)[currSquare].location.posX;
      prev.posY = getBoardPositions(boardOrientation)[currSquare].location.posY;
      return { ...prev };
    });
  };

  const onDragStart = (e) => {
    // Snap piece position to Mouse
    const halfOfPieceSize = 6.25;
    const posX =
      ((e.clientX - chessBoard.current.offsetLeft) /
        chessBoard.current.clientWidth) *
        100 -
      halfOfPieceSize;
    const posY =
      ((e.clientY - chessBoard.current.offsetTop) /
        chessBoard.current.clientWidth) *
        100 -
      halfOfPieceSize;

    // Window events to track drag and drop outside of chessboard
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onWindowDrop);
    // Update dragging sate
    setdraggingState((prev) => {
      prev.isDragging = true;
      prev.posX = posX;
      prev.posY = posY;
      return { ...prev };
    });
  };

  const onDrag = useCallback(
    (e) => {
      const halfOfPieceSizePercent = 6.25;
      let posX =
        ((e.clientX - chessBoard.current.offsetLeft) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSizePercent;
      let posY =
        ((e.clientY - chessBoard.current.offsetTop) /
          chessBoard.current.clientWidth) *
          100 -
        halfOfPieceSizePercent;

      // Check that the values are in bounds of container
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

      setdraggingState((prev) => {
        prev.posX = posX;
        prev.posY = posY;
        return { ...prev };
      });
    },
    [chessBoard]
  );

  const onDragDrop = (e) => {
    // Get x and y positions
    const singlesquareSizePx = chessBoard.current.clientWidth / 8;
    const singlesquareSizePercent = 12.5;
    const posX =
      Math.floor(
        (e.clientX - chessBoard.current.offsetLeft) / singlesquareSizePx
      ) * singlesquareSizePercent;
    const posY =
      Math.floor(
        (e.clientY - chessBoard.current.offsetTop) / singlesquareSizePx
      ) * singlesquareSizePercent;

    // Remove window mouse event
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", onWindowDrop);
    // Move piece to next square or back to original position
    const nextSquare = getBoardSquare(boardOrientation, posX, posY);
    if (!onPieceDrop(currSquare, nextSquare)) {
      setdraggingState((prev) => {
        prev.isDragging = false;
        prev.posX =
          getBoardPositions(boardOrientation)[currSquare].location.posX;
        prev.posY =
          getBoardPositions(boardOrientation)[currSquare].location.posY;
        return { ...prev };
      });
    }
  };

  return (
    <div
      // Classes
      className={`piece-img ${piece ? piece : ""}${
        draggingState.isDragging ? " dragging" : ""
      }`}
      // Inline Styles
      style={{
        top: `${draggingState.posY}%`,
        left: `${draggingState.posX}%`,
      }}
      // Event Callbacks
      onMouseDown={onDragStart}
      onMouseUp={onDragDrop}
      onMouseLeave={handleOutOfBounds}
      onMouseEnter={handleInBounds}
    ></div>
  );
}

export default DraggableElement;
