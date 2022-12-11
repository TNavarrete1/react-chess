// Styles
import "components/ChessBoard/ChessBoardWrapper.css";
// Components
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKing,
  faChessPawn as fasChessPawn,
  faChessQueen as fasChessQueen,
  faChessKnight as fasChessKnight,
  faChessBishop as fasChessBishop,
  faChessRook as fasChessRook,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChessPawn as farChessPawn,
  faChessQueen as farChessQueen,
  faChessKnight as farChessKnight,
  faChessBishop as farChessBishop,
  faChessRook as farChessRook,
} from "@fortawesome/free-regular-svg-icons";

export default function ChessBoardWrapper({
  // Data
  resetToggle,
  boardOrientation,
  gameStart,
  gameOver,
  gameMode,
  team,
  minutes,
  playerTurn,
  lastMove,
  movedAfterPreview,
  currMoveNum,
  // Functions
  endGame,
  children,
}) {
  const [players, setPlayers] = useState({
    top: {
      name: "player 1",
      team: "white",
      captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
      capturePoints: 0,
      minutes,
      seconds: 0,
    },
    bottom: {
      name: "player 2",
      team: "black",
      captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
      capturePoints: 0,
      minutes,
      seconds: 0,
    },
  });
  const [playersHistory, setPlayersHistory] = useState([]);

  // Helper functions
  const updatePlayers = (team, gameMode, boardOrientation) => {
    // Set player names
    let topName, bottomName;
    if (gameMode === "computer") {
      if (team === "white") {
        if (boardOrientation === "white") {
          topName = "computer";
          bottomName = "player";
        } else {
          topName = "player";
          bottomName = "computer";
        }
      } else {
        if (boardOrientation === "white") {
          topName = "player";
          bottomName = "computer";
        } else {
          topName = "computer";
          bottomName = "player";
        }
      }
    } else {
      if (boardOrientation === "white") {
        topName = "player 2";
        bottomName = "player 1";
      } else {
        topName = "player 1";
        bottomName = "player 2";
      }
    }

    setPlayers((prev) => {
      // Set names
      prev.top.name = topName;
      prev.bottom.name = bottomName;

      // Switch player
      let topTeam, bottomTeam;
      if (boardOrientation === "white") {
        topTeam = "black";
        bottomTeam = "white";
      } else {
        topTeam = "white";
        bottomTeam = "black";
      }

      // Switch captures and points
      let topCaptures, bottomCaptures;
      let topPoints, bottomPoints;
      let topMin, bottomMin;
      let topSec, bottomSec;
      if (topTeam === prev.top.team) {
        topCaptures = prev.top.captures;
        topPoints = prev.top.capturePoints;
        topMin = prev.top.minutes;
        topSec = prev.top.seconds;
        bottomCaptures = prev.bottom.captures;
        bottomPoints = prev.bottom.capturePoints;
        bottomMin = prev.bottom.minutes;
        bottomSec = prev.bottom.seconds;
      } else {
        topCaptures = prev.bottom.captures;
        topPoints = prev.bottom.capturePoints;
        topMin = prev.bottom.minutes;
        topSec = prev.bottom.seconds;
        bottomCaptures = prev.top.captures;
        bottomPoints = prev.top.capturePoints;
        bottomMin = prev.top.minutes;
        bottomSec = prev.top.seconds;
      }

      // Set teams
      prev.top.team = topTeam;
      prev.bottom.team = bottomTeam;
      // Set captures and points
      prev.top.captures = topCaptures;
      prev.bottom.captures = bottomCaptures;
      prev.top.capturePoints = topPoints;
      prev.bottom.capturePoints = bottomPoints;
      // Set minutes and seconds
      prev.top.minutes = topMin;
      prev.top.seconds = topSec;
      prev.bottom.minutes = bottomMin;
      prev.bottom.seconds = bottomSec;

      return { ...prev };
    });
  };
  const pieceNameToPoints = (pieceName) => {
    const pointsTable = {
      p: 1,
      n: 3,
      b: 3,
      r: 5,
      q: 9,
    };

    return pointsTable[pieceName];
  };

  const pieceNameToIcon = (pieceName, pieceColor) => {
    const pieceNameTable = {
      Q: farChessQueen,
      q: fasChessQueen,
      N: farChessKnight,
      n: fasChessKnight,
      B: farChessBishop,
      b: fasChessBishop,
      R: farChessRook,
      r: fasChessRook,
      P: farChessPawn,
      p: fasChessPawn,
    };

    // Transform black piece names to corresponding capitilization
    if (pieceColor === "b") {
      pieceName = pieceName.toUpperCase();
    }

    return pieceNameTable[pieceName];
  };

  const renderCaptures = (team, captures) => {
    return Object.keys(captures).map((piece) => {
      if (captures[piece] === 0) {
        return null;
      }
      return (
        <span key={piece} className="piece-type">
          {(() => {
            const pieces = [];
            for (let i = 0; i < captures[piece]; i++) {
              if (team === "white") {
                pieces.push(
                  <FontAwesomeIcon
                    key={"b" + i}
                    icon={pieceNameToIcon(piece, "b")}
                    className="piece"
                    style={{ zIndex: i }}
                  />
                );
              } else {
                pieces.push(
                  <FontAwesomeIcon
                    key={"w" + i}
                    icon={pieceNameToIcon(piece, "w")}
                    className="piece"
                    style={{ zIndex: i }}
                  />
                );
              }
            }
            return pieces;
          })()}
        </span>
      );
    });
  };

  const renderAvatar = (player) => {
    if (player.name === "Computer" || player.name === "computer") {
      return (
        <FontAwesomeIcon
          icon={faRobot}
          style={{
            color: "var(--color-dark-blue)",
            background: "var(--bg-white)",
          }}
        />
      );
    }
    if (player.team === "white") {
      return (
        <FontAwesomeIcon
          icon={faChessKing}
          style={{
            color: "var(--color-white)",
            background: "var(--bg-dark-blue)",
          }}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faChessKing}
          style={{ color: "var(--color-black)", background: "var(--bg-white)" }}
        />
      );
    }
  };

  const renderPoints = (player1Pts, player2Pts) => {
    if (player1Pts - player2Pts > 0) {
      return `+${player1Pts - player2Pts}`;
    } else return null;
  };

  const renderTime = (minutes, seconds) => {
    if (seconds < 10) return `${minutes}:0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  // Reset
  useEffect(() => {
    setPlayers((prev) => {
      // Reset captures
      prev.top.captures = { p: 0, b: 0, n: 0, r: 0, q: 0 };
      prev.bottom.captures = { p: 0, b: 0, n: 0, r: 0, q: 0 };
      // Reset capture points
      prev.top.capturePoints = 0;
      prev.bottom.capturePoints = 0;
      // Reset time
      prev.top.minutes = minutes;
      prev.top.seconds = 0;
      prev.bottom.minutes = minutes;
      prev.bottom.seconds = 0;

      return { ...prev };
    });
  }, [resetToggle, minutes]);

  // Set clock countdown
  useEffect(() => {
    if (!gameStart || !minutes) return;

    let intervalNeedsClearing = false;
    const countdown = setInterval(() => {
      setPlayers((prev) => {
        // Determin if interval needs to be cleared
        if (
          (prev.top.minutes === 0 && prev.top.seconds === 0) ||
          (prev.bottom.minutes === 0 && prev.bottom.seconds === 0)
        ) {
          intervalNeedsClearing = true;
          return prev;
        }
        // Reduce time
        if (playerTurn === prev.top.team) {
          if (prev.top.minutes > 0 && prev.top.seconds === 0) {
            prev.top.minutes -= 1;
            prev.top.seconds = 59;
          } else {
            prev.top.seconds -= 1;
          }
        } else {
          if (prev.bottom.minutes > 0 && prev.bottom.seconds === 0) {
            prev.bottom.minutes -= 1;
            prev.bottom.seconds = 59;
          } else {
            prev.bottom.seconds -= 1;
          }
        }
        return { ...prev };
      });
      // Clear interval because timer is out of time or game is over
      if (gameOver || intervalNeedsClearing) {
        clearInterval(countdown);
        // End game by timeout
        if (intervalNeedsClearing) {
          endGame({ timeout: true });
        }
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [gameStart, minutes, gameOver, playerTurn, endGame]);

  // Switch top and bottom when necessary
  useEffect(() => {
    updatePlayers(team, gameMode, boardOrientation);
  }, [team, gameMode, boardOrientation]);

  // Track captured pieces
  useEffect(() => {
    if (movedAfterPreview) return;
    let currPlayer;
    setPlayers((prev) => {
      if (lastMove.captured) {
        if (lastMove.color === prev.top.team[0]) {
          prev.top.captures[lastMove.captured] += 1;
          prev.top.capturePoints += pieceNameToPoints(lastMove.captured);
        } else {
          prev.bottom.captures[lastMove.captured] += 1;
          prev.bottom.capturePoints += pieceNameToPoints(lastMove.captured);
        }
        currPlayer = JSON.parse(JSON.stringify(prev));
        return { ...prev };
      }
      currPlayer = JSON.parse(JSON.stringify(prev));
      return prev;
    });
    setPlayersHistory((prev) => {
      if (prev.length === 0) {
        return [currPlayer];
      }
      if (!lastMove.validMove) return prev;
      prev.push(currPlayer);
      return prev;
    });
  }, [lastMove, movedAfterPreview]);

  // Updates players if a move is made during a preview
  useEffect(() => {
    if (!movedAfterPreview) return;

    let currPlayer;
    setPlayers((prev) => {
      const pastPlayers = JSON.parse(
        JSON.stringify(playersHistory[currMoveNum - 1])
      );
      if (prev.top.team === pastPlayers.top.team) {
        prev.top.captures = pastPlayers.top.captures;
        prev.top.capturePoints = pastPlayers.top.capturePoints;
        prev.bottom.captures = pastPlayers.bottom.captures;
        prev.bottom.capturePoints = pastPlayers.bottom.capturePoints;
      } else {
        prev.top.name = pastPlayers.bottom.name;
        prev.top.team = pastPlayers.bottom.team;
        prev.top.captures = pastPlayers.bottom.captures;
        prev.top.capturePoints = pastPlayers.bottom.capturePoints;
        prev.bottom.name = pastPlayers.top.name;
        prev.bottom.team = pastPlayers.top.team;
        prev.bottom.captures = pastPlayers.top.captures;
        prev.bottom.capturePoints = pastPlayers.top.capturePoints;
      }
      if (lastMove.captured) {
        if (lastMove.color === prev.top.team[0]) {
          prev.top.captures[lastMove.captured] += 1;
          prev.top.capturePoints += pieceNameToPoints(lastMove.captured);
        } else {
          prev.bottom.captures[lastMove.captured] += 1;
          prev.bottom.capturePoints += pieceNameToPoints(lastMove.captured);
        }
        currPlayer = JSON.parse(JSON.stringify(prev));
        return { ...prev };
      }
      currPlayer = JSON.parse(JSON.stringify(prev));
      return prev;
    });
    setPlayersHistory((prev) => {
      prev.splice(currMoveNum, prev.length - currMoveNum, currPlayer);
      return prev;
    });
  }, [currMoveNum, lastMove, movedAfterPreview, playersHistory]);

  return (
    <div id="chess-board-wrapper">
      <div className="player-card">
        <div className="player-avatar">{renderAvatar(players.top)}</div>
        <header className="username">{players.top.name}</header>
        <div className="captures-wrapper">
          <div className="captured-pieces">
            {renderCaptures(players.top.team, players.top.captures)}
          </div>
          <div className="captured-points">
            {renderPoints(
              players.top.capturePoints,
              players.bottom.capturePoints
            )}
          </div>
        </div>
        {minutes && (
          <div className="time">
            {renderTime(players.top.minutes, players.top.seconds)}
          </div>
        )}
      </div>
      {children}
      <div className="player-card">
        <div className="player-avatar">{renderAvatar(players.bottom)}</div>
        <header className="username">{players.bottom.name}</header>
        <div className="captures-wrapper">
          <div className="captured-pieces">
            {renderCaptures(players.bottom.team, players.bottom.captures)}
          </div>
          <div className="captured-points">
            {renderPoints(
              players.bottom.capturePoints,
              players.top.capturePoints
            )}
          </div>
        </div>
        {minutes && (
          <div className="time">
            {renderTime(players.bottom.minutes, players.bottom.seconds)}
          </div>
        )}
      </div>
    </div>
  );
}
