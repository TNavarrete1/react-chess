// Styles
import "components/ChessBoard/ChessBoard.css";
// React components
import { useState, useEffect, useCallback, forwardRef } from "react";
import DraggableElement from "components/ChessBoard/DraggableElement";
import AxesLables from "components/ChessBoard/AxesLabels";
import HoverSquare from "components/ChessBoard/HoverSquare";
import PossibleMoves from "components/ChessBoard/PossibleMoves";
import MovementAfterEffect from "components/ChessBoard/MovementAfterEffect";

function ChessBoard(
  {
    width,
    gameOver,
    resetToggle,
    boardOrientation,
    isBoardInactive,
    position,
    move,
    canMoveAfterPreview,
    canMovePieces,
    isPreviewing,
    theme,
    onPieceDrop,
    onPieceDragBegin,
  },
  ref
) {
  // State hook
  const [hoverSquareEffects, setHoverSquareEffects] = useState({
    square: "",
    touchDrag: false,
  });
  const [selectedPieceEffects, setSelectedPieceEffects] = useState({
    possibleMoves: null,
    square: "",
    activatedOnce: false,
  });

  // Renders hover square
  const handleSquareHover = useCallback((square, touchDrag = false) => {
    setHoverSquareEffects({
      square,
      touchDrag,
    });
  }, []);

  // Renders possible moves component under conditions
  const activateSelectedPieceEffects = useCallback(
    (sourceSquare, piece) => {
      // Gets possible moves
      const moves = onPieceDragBegin(sourceSquare, piece);

      setSelectedPieceEffects((prev) => {
        // Sets to default object with activatedOnce as false
        if (!prev)
          return {
            possibleMoves: moves,
            square: sourceSquare,
            activatedOnce: false,
          };

        // If a new piece is selected reset activatedOnce
        if (sourceSquare !== prev.square)
          return {
            possibleMoves: moves,
            square: sourceSquare,
            activatedOnce: false,
          };

        // sourceSquare has been clicked once
        return {
          possibleMoves: moves,
          square: sourceSquare,
          activatedOnce: true,
        };
      });
    },
    [onPieceDragBegin]
  );

  // Removes possible moves component
  const deactivateSelectedPieceEffects = useCallback((targetSquare) => {
    setSelectedPieceEffects((prev) => {
      // Target square has been clicked once alread: effects need to be cleared
      if (prev.activatedOnce)
        return { possibleMoves: null, square: "", activatedOnce: false };
      // Target square is dfferent than source square: old effects need to be cleared
      if (targetSquare !== prev.square)
        return { possibleMoves: null, square: "", activatedOnce: false };

      // First click on target square
      prev.activatedOnce = true;
      return { ...prev };
    });
  }, []);

  // useEffect hooks
  useEffect(() => {
    const boardRef = ref.current;
    const handleTouchStart = (e) => {
      e.preventDefault();
    };
    if (boardRef) {
      boardRef.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
    }

    return () => {
      if (boardRef) {
        boardRef.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [ref]); // Disables touch events on chess board

  useEffect(() => {
    setHoverSquareEffects({ square: "", touchDrag: false });
    setSelectedPieceEffects({
      possibleMoves: null,
      square: "",
      activatedOnce: false,
    });
  }, [isPreviewing, resetToggle, gameOver]); // Resets chess board

  return (
    <div id="chess-board" className="bg-tan" ref={ref}>
      {
        /******************************************************
            Inactive Board Modal
        ************************************************* */
        isBoardInactive && <div id="board-modal"></div>
        /***************************************************
            Inactive Board Modal
        **************************************************** */
      }
      <AxesLables
        boardOrientation={boardOrientation}
        theme={theme}
        width={width}
      />
      {hoverSquareEffects.square && (
        <HoverSquare
          boardOrientation={boardOrientation}
          hoverSquare={hoverSquareEffects.square}
          touchDrag={hoverSquareEffects.touchDrag}
        />
      )}
      {selectedPieceEffects.possibleMoves && selectedPieceEffects.square && (
        <PossibleMoves
          boardOrientation={boardOrientation}
          possibleMoves={selectedPieceEffects.possibleMoves}
          square={selectedPieceEffects.square}
          // Functions
          onPieceDrop={onPieceDrop}
          deactivateSelectedPieceEffects={deactivateSelectedPieceEffects}
          width={width}
        />
      )}
      {move && (
        <MovementAfterEffect
          boardOrientation={boardOrientation}
          sourceSquare={move.sourceSquare}
          targetSquare={move.targetSquare}
        />
      )}
      {
        /******************************************************
            Board Pieces
        ************************************************* */
        position &&
          position.map((row) => {
            // null row
            if (!row) return null;

            // Iterate through each row
            return row.map((square) => {
              // null Square
              if (!square) return null;

              let sourceSquare = square.square;
              let targetSquare = square.square;

              // Return Draggable piece
              return (
                <DraggableElement
                  key={JSON.stringify(square)}
                  // Data
                  boardOrientation={boardOrientation}
                  sourceSquare={sourceSquare}
                  targetSquare={targetSquare}
                  pieceName={square.type}
                  pieceColor={square.color}
                  canMovePieces={canMovePieces}
                  // Functionson
                  onPieceDragBegin={onPieceDragBegin}
                  onPieceDrop={onPieceDrop}
                  onSquareHover={handleSquareHover}
                  activateSelectedPieceEffects={activateSelectedPieceEffects}
                  deactivateSelectedPieceEffects={
                    deactivateSelectedPieceEffects
                  }
                  // Ref
                  chessBoard={ref}
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

export default forwardRef(ChessBoard);
