// Styles
import "root.css";
import "App.css";
// Components
import { useEffect, useState, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import ChessBoardWrapper from "components/ChessBoard/ChessBoardWrapper";
import ChessBoard from "components/ChessBoard/ChessBoard";
import GameOptions from "components/GameOptions/GameOptions";
import GameTracker from "components/GameTracker/GameTracker";
import GameDecision from "components/ChessBoard/GameDecision";

const game = new Chess(); // Chess rules and logic

function App() {
  // Refs
  const layout = useRef();
  const chessBoard = useRef();

  // States
  const [boardWidth, setBoardWidth] = useState();
  const [boardOrientation, setBoardOrientation] = useState("white"); // Handles board orientation
  const [position, setPosition] = useState({
    board: game.board(),
    move: null,
  }); // Tracks current board and piece movement
  const [positionHistory, setPositionHistory] = useState([
    { board: game.board(), move: null, pgn: game.pgn() },
  ]); // Stores board and piece movement history
  const [moveHistory, setMoveHistory] = useState(null); // Stores player moves up to current move
  const [preview, setPreview] = useState({
    isPreviewing: false,
    movedAfterPreview: false,
    moveNum: 0,
  }); // tracks preview
  const [gameState, setGameState] = useState({
    gameStart: false,
    gameOver: false,
    decisionTxt: "",
    winnerTxt: "",
    canMovePieces: false,
    team: "white", // default team
    gameMode: "",
  }); // Tracks options chosen before game start
  const [lastMove, setLastMove] = useState({
    validMove: false,
    captured: null,
    color: "",
  });
  const [resetToggle, setResetToggle] = useState(false);

  useEffect(() => {
    const resizeChessBoard = () => {
      setBoardWidth(chessBoard.current.clientWidth);
    };

    window.addEventListener("resize", resizeChessBoard);
    resizeChessBoard();

    return () => {
      window.removeEventListener("resize", resizeChessBoard);
    };
  }, []);

  const makeRandomMove = useCallback(() => {
    const possibleMoves = game.moves();
    // No moves possible
    if (possibleMoves.length === 0) return;

    // Make random move
    const randomIdx = Math.floor(Math.random() * possibleMoves.length);
    const move = game.move(possibleMoves[randomIdx]);

    // End game
    if (game.isGameOver()) {
      deactivatePieces();
      setGameState((prev) => {
        prev.gameOver = true;
        prev.decisionTxt = "Checkmate";
        prev.winnerTxt = "Winner: computer";
        return { ...prev };
      });
    }

    setLastMove((prev) => {
      prev.validMove = true;
      if (move.captured) {
        prev.captured = move.captured;
        prev.color = move.color;
      } else {
        prev.captured = null;
        prev.color = "";
      }
      return { ...prev };
    });
    setPosition({
      board: game.board(),
      move: { sourceSquare: move.from, targetSquare: move.to },
    });
    setMoveHistory(game.history({ verbose: true }));
    setPositionHistory((prev) => {
      return [
        ...prev,
        {
          board: game.board(),
          move: { sourceSquare: move.from, targetSquare: move.to },
          pgn: game.pgn(),
        },
      ];
    });
    setPreview((prev) => {
      return {
        isPreviewing: false,
        movedAfterPreview: false,
        moveNum: prev.moveNum + 1,
      };
    });
  }, []);

  // Runs when a piece is dropped on the board
  const handlePieceDrop = useCallback(
    (sourceSquare, targetSquare) => {
      // Moves piece
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
      });
      // Try to do a promotion move
      if (move === null) {
        move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
      }

      // End Game
      if (game.isGameOver()) {
        deactivatePieces();
        setGameState((prev) => {
          prev.gameOver = true;
          // Last move game ending move was made by your team
          prev.decisionTxt = "by checkmate";
          if (prev.gameMode === "computer") {
            prev.winnerTxt = "Congrats, you won!";
          } else if (game.turn() === "b") {
            prev.winnerTxt = "player 1 Won!";
          } else {
            prev.winnerTxt = "player 2 Won!";
          }
          return { ...prev };
        });
      }

      // Move wasn't valid don't update board
      if (move === null) {
        setLastMove((prev) => {
          prev.validMove = false;
          prev.captured = null;
          prev.color = "";
          return { ...prev };
        });
        if (preview.isPreviewing) {
          game.loadPgn(positionHistory[positionHistory.length - 1].pgn);
          // Makes sure preview is reset if pieceDrop is done during a preview
          setPreview({
            isPreviewing: false,
            movedAfterPreview: false,
            moveNum: positionHistory.length - 1,
          });
          // Moves pieces back to latest position on invalid move
          setPosition({
            board: positionHistory[positionHistory.length - 1].board,
            move: positionHistory[positionHistory.length - 1].move,
          });
        }
        return false;
      }

      // Move was valid so update board
      if (targetSquare !== sourceSquare) {
        setLastMove((prev) => {
          prev.validMove = true;
          if (move.captured) {
            prev.captured = move.captured;
            prev.color = move.color;
          } else {
            prev.captured = null;
            prev.color = "";
          }
          return { ...prev };
        });
        setPosition({
          board: game.board(),
          move: { sourceSquare, targetSquare },
        });
        setMoveHistory(game.history({ verbose: true }));
        // Makes sure preview is reset if pieceDrop is done during a preview
        setPreview((prev) => {
          prev.movedAfterPreview = false;
          if (prev.isPreviewing) {
            prev.movedAfterPreview = true;
          }
          prev.isPreviewing = false;
          prev.moveNum = prev.moveNum + 1;

          return {
            ...prev,
          };
        });

        // Erases position history after current piece drop if it is done during a preview
        if (preview.isPreviewing) {
          // Remove history after current preview
          setPositionHistory((prev) => {
            const lastIndex = preview.moveNum + 1;
            return [
              ...prev.slice(0, lastIndex),
              {
                board: game.board(),
                move: { sourceSquare, targetSquare },
                pgn: game.pgn(),
              },
            ];
          });
        } else {
          setPositionHistory((prev) => {
            return [
              ...prev,
              {
                board: game.board(),
                move: { sourceSquare, targetSquare },
                pgn: game.pgn(),
              },
            ];
          });
        }
      }

      if (gameState.gameMode === "computer") {
        window.setTimeout(makeRandomMove, 500);
      }
      return true;
    },
    [
      gameState.gameMode,
      positionHistory,
      preview.isPreviewing,
      preview.moveNum,
      makeRandomMove,
    ]
  );

  // Runs when piece is first dragged
  const handlePieceDragBegin = useCallback((sourceSquare, piece) => {
    const moves = game.moves({ square: sourceSquare, verbose: true });
    return moves;
  }, []);

  // Change board orientation to chosen value
  const changeBoardOrientation = (boardOrientation) => {
    if (boardOrientation === "random") {
      boardOrientation =
        Math.floor(Math.random() * 2) === 0 ? "white" : "black";
    }
    setBoardOrientation(boardOrientation);
    // Updates team before game has started
    if (!gameState.gameStart) {
      setGameState((prev) => {
        prev.team = boardOrientation;
        return { ...prev };
      });
    }
  };

  //  Flip board
  const flipBoardOrientation = () => {
    if (boardOrientation === "white") {
      setBoardOrientation("black");
    } else {
      setBoardOrientation("white");
    }
  };

  const deactivatePieces = () => {
    setGameState((prev) => {
      prev.canMovePieces = false;
      return { ...prev };
    });
  };

  const chooseGameMode = (gameMode) => {
    setGameState((prev) => {
      prev.gameMode = gameMode;
      return { ...prev };
    });
  };

  const startGame = () => {
    let team, gameMode;
    setGameState((prev) => {
      gameMode = prev.gameMode;
      team = prev.team;
      prev.gameStart = true;
      prev.canMovePieces = true;
      return { ...prev };
    });

    if (gameMode === "computer" && game.turn() !== team[0]) {
      window.setTimeout(makeRandomMove, 1000);
    }
  };

  const resetGame = (team = "white", gameMode = "", playingAgain = false) => {
    game.reset();
    setResetToggle((prev) => {
      return !prev;
    });
    setBoardOrientation(team);
    setPosition({ board: game.board(), move: null });
    setMoveHistory(null);
    setPositionHistory([{ board: game.board(), move: null, pgn: game.pgn() }]);
    setGameState({
      gameStart: playingAgain ? true : false,
      gameOver: false,
      decisionTxt: "",
      winnerTxt: "",
      canMovePieces: playingAgain ? true : false,
      team,
      gameMode,
    });
    setPreview({
      isPreviewing: false,
      movedAfterPreview: false,
      moveNum: null,
    });
    setLastMove({
      validMove: false,
      captured: null,
      color: "",
    });
  };

  const previewPosition = (moveNum) => {
    setPreview({ isPreviewing: true, movedAfterPreview: false, moveNum });

    // Load current preview game data
    game.loadPgn(positionHistory[moveNum].pgn);
    // Change position to current preview
    setPosition({
      board: positionHistory[moveNum].board,
      move: positionHistory[moveNum].move,
    });
  };

  return (
    <>
      <GameDecision
        // Data
        gameOver={gameState.gameOver}
        decisionTxt={gameState.decisionTxt}
        winnerTxt={gameState.winnerTxt}
        team={gameState.team}
        gameMode={gameState.gameMode}
        // Functions
        resetGame={resetGame}
      />
      <div id="layout" ref={layout}>
        <ChessBoardWrapper
          resetToggle={resetToggle}
          boardOrientation={boardOrientation}
          gameMode={gameState.gameMode}
          team={gameState.team}
          lastMove={lastMove}
          movedAfterPreview={preview.movedAfterPreview}
          currMoveNum={preview.moveNum}
          children={
            <ChessBoard
              ref={chessBoard}
              width={boardWidth}
              boardOrientation={boardOrientation}
              isBoardInactive={!gameState.gameStart}
              position={position.board}
              move={position.move}
              canMovePieces={gameState.canMovePieces}
              canMoveAfterPreview={true}
              isPreviewing={preview.isPreviewing}
              theme="tan"
              onPieceDrop={handlePieceDrop}
              onPieceDragBegin={handlePieceDragBegin}
            />
          }
        />
        <div id="side-card">
          {gameState.gameStart ? (
            <GameTracker
              // Data
              moveHistory={moveHistory}
              moveNum={preview.moveNum}
              // Functions
              resetGame={resetGame}
              handleBoardFlip={flipBoardOrientation}
              previewPosition={previewPosition}
            />
          ) : (
            <GameOptions
              handleBoardOrientationOption={changeBoardOrientation}
              handleGameMode={chooseGameMode}
              handleStartGame={startGame}
              showHeader={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default App;
