// Styles
import "components/GameOptions/TeamOptions.css";
// Components
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faChessKing } from "@fortawesome/free-regular-svg-icons";

function TeamOptions({ handleBoardOrientationOption, handleStartGame }) {
  const [clickedOrientation, setClickedOrientation] = useState("white");

  const onClickTeamOption = (e) => {
    const boardOrientation = e.currentTarget.dataset.boardOrientation;
    handleBoardOrientationOption(boardOrientation);
    setClickedOrientation(boardOrientation);
  };

  const onClickStartGame = () => {
    handleStartGame();
  };

  return (
    <div id="board-orientation-list">
      <header>Choose a team: </header>
      <button
        id="white-board-orientation-icon"
        className={`board-orientation-button ${
          clickedOrientation === "white"
            ? "board-orientation-button-highlight"
            : ""
        }`}
        data-board-orientation="white"
        onClick={onClickTeamOption}
      >
        <FontAwesomeIcon
          icon={faChessKing}
          style={{
            "--color": "var(--bg-dark-gray700)",
            "--bg": "var(--bg-white)",
          }}
        />
      </button>
      <button
        id="random-board-orientation-icon"
        className={`board-orientation-button ${
          clickedOrientation === "random"
            ? "board-orientation-button-highlight"
            : ""
        }`}
        data-board-orientation="random"
        onClick={onClickTeamOption}
      >
        <FontAwesomeIcon
          icon={faShuffle}
          style={{
            "--color": "var(--bg-gray500)",
            "--bg":
              "linear-gradient(to right, var(--bg-white) 50%, var(--bg-dark-gray700) 50%",
          }}
        />
      </button>
      <button
        id="black-board-orientation-icon"
        className={`board-orientation-button ${
          clickedOrientation === "black"
            ? "board-orientation-button-highlight"
            : ""
        }`}
        data-board-orientation="black"
        onClick={onClickTeamOption}
      >
        <FontAwesomeIcon
          icon={faChessKing}
          style={{
            "--color": "var(--bg-white)",
            "--bg": "var(--bg-dark-gray700)",
          }}
        />
      </button>
      <button id="start-game-button" onClick={onClickStartGame}>
        Play
      </button>
    </div>
  );
}

export default TeamOptions;
