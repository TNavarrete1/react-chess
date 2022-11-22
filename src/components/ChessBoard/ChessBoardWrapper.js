// Styles
import "components/ChessBoard/ChessBoardWrapper.css";
// Components
import { useState, useEffect } from "react";

export default function ChessBoardWrapper({
  boardOrientation,
  gameMode,
  team,
  children,
}) {
  const [players, setPlayers] = useState({
    player1: "player 1",
    player2: "player 2",
  });

  useEffect(() => {
    if (gameMode !== "computer") {
      if (boardOrientation === "white") {
        setPlayers({
          player1: "player 1",
          player2: "player 2",
        });
      } else {
        setPlayers({
          player1: "player 2",
          player2: "player 1",
        });
      }
    } else {
      if (team === "white") {
        if (boardOrientation === "white") {
          setPlayers({
            player1: "player",
            player2: "computer",
          });
        } else {
          setPlayers({
            player1: "computer",
            player2: "player",
          });
        }
      } else {
        if (boardOrientation === "white") {
          setPlayers({
            player1: "computer",
            player2: "player",
          });
        } else {
          setPlayers({
            player1: "player",
            player2: "computer",
          });
        }
      }
    }
  }, [boardOrientation, gameMode, team]);

  return (
    <div id="chess-board-wrapper">
      <div className="player-card">{players.player2}</div>
      {children}
      <div className="player-card">{players.player1}</div>
    </div>
  );
}
