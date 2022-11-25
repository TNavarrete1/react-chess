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
  boardOrientation,
  gameStart,
  gameOver,
  gameMode,
  team,
  lastMove,
  movedAfterPreview,
  currMoveNum,
  children,
}) {
  const [players, setPlayers] = useState({
    top: {
      name: "player 1",
      team: "white",
      captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
      capturePoints: 0,
    },
    bottom: {
      name: "player 2",
      team: "black",
      captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
      capturePoints: 0,
    },
  });
  const [playersHistory, setPlayersHistory] = useState([]);

  // Helper functions
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

  // Reset
  useEffect(() => {
    if (!gameStart && !gameOver) {
      setPlayers({
        top: {
          name: "player 1",
          team: "white",
          captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
          capturePoints: 0,
        },
        bottom: {
          name: "player 2",
          team: "black",
          captures: { p: 0, b: 0, n: 0, r: 0, q: 0 },
          capturePoints: 0,
        },
      });
    }
  }, [gameStart, gameOver]);

  // Switch top and bottom when necessary
  useEffect(() => {
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
      if (topTeam === prev.top.team) {
        topCaptures = prev.top.captures;
        topPoints = prev.top.capturePoints;
        bottomCaptures = prev.bottom.captures;
        bottomPoints = prev.bottom.capturePoints;
      } else {
        topCaptures = prev.bottom.captures;
        topPoints = prev.bottom.capturePoints;
        bottomCaptures = prev.top.captures;
        bottomPoints = prev.top.capturePoints;
      }

      // Set teams
      prev.top.team = topTeam;
      prev.bottom.team = bottomTeam;
      // Set captures
      prev.top.captures = topCaptures;
      prev.bottom.captures = bottomCaptures;
      // Set points
      prev.top.capturePoints = topPoints;
      prev.bottom.capturePoints = bottomPoints;

      return { ...prev };
    });
  }, [boardOrientation, gameMode, team]);

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
      <div className="player-card" style={{ padding: "0 5px 10px 5px" }}>
        <div className="player-avatar">{renderAvatar(players.top)}</div>
        <header className="username">{players.top.name}</header>
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
      {children}
      <div className="player-card" style={{ padding: "10px 5px 0 5px" }}>
        <div className="player-avatar">{renderAvatar(players.bottom)}</div>
        <header className="username">{players.bottom.name}</header>
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
    </div>
  );
}
