import { useState, useCallback } from "react";

function DraggableElement({ cell, chessBoard }) {
  const [draggingState, setdraggingState] = useState({
    isDragging: false,
    posX: cell.location.posX,
    posY: cell.location.posY,
  });

  const onDragStart = (e) => {
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

    window.addEventListener("mousemove", onDrag);
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
    const singleCellSizePx = chessBoard.current.clientWidth / 8;
    const singleCellSizePercent = 12.5;
    const posX =
      Math.floor(
        (e.clientX - chessBoard.current.offsetLeft) / singleCellSizePx
      ) * singleCellSizePercent;
    const posY =
      Math.floor(
        (e.clientY - chessBoard.current.offsetTop) / singleCellSizePx
      ) * singleCellSizePercent;

    window.removeEventListener("mousemove", onDrag);
    setdraggingState((prev) => {
      prev.isDragging = false;
      prev.posX = posX;
      prev.posY = posY;
      return { ...prev };
    });
  };

  return (
    <div
      // Classes
      className={`piece-img ${cell ? cell.piece : ""} ${
        draggingState.isDragging ? "dragging" : ""
      }`}
      // Data
      data-team={cell.team}
      data-id={cell.id}
      // Inline Styles
      style={{
        top: `${draggingState.posY}%`,
        left: `${draggingState.posX}%`,
      }}
      // Event Callbacks
      onMouseDown={onDragStart}
      onMouseUp={onDragDrop}
    ></div>
  );
}

export default DraggableElement;
