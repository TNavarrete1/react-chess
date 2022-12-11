// Styles
import "components/GameOptions/TeamOptions.css";
// Components
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faHourglassStart,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { faChessKing } from "@fortawesome/free-regular-svg-icons";
// Hooks
import useComponentVisible from "hooks/useComponentVisible";

function TeamOptions({
  minutes,
  chooseMin,
  handleBoardOrientationOption,
  handleStartGame,
}) {
  const [clickedOrientation, setClickedOrientation] = useState("white");
  const [clickedMin, setClickedMin] = useState("inf");
  const { ref, toggleRef, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, true);

  const onClickTeamOption = (e) => {
    const boardOrientation = e.currentTarget.dataset.boardOrientation;
    handleBoardOrientationOption(boardOrientation);
    setClickedOrientation(boardOrientation);
  };

  const onClickStartGame = () => {
    handleStartGame();
  };

  const chooseTime = (e) => {
    const min = e.currentTarget.dataset.min;
    if (min === "inf") {
      chooseMin(null);
    } else {
      chooseMin(parseInt(min));
    }
    // Activate button
    setClickedMin(min);
    // Close pulldown
    setIsComponentVisible(false);
  };

  return (
    <div id="board-orientation-list">
      <header>Choose a team: </header>
      <div id="team-buttons">
        <button
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
              "--color": "var(--bg-dark-gray500)",
              "--bg": "var(--bg-white)",
            }}
          />
        </button>
        <button
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
                "linear-gradient(to right, var(--bg-white) 50%, var(--bg-dark-gray500) 50%",
            }}
          />
        </button>
        <button
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
              "--bg": "var(--bg-dark-gray500)",
            }}
          />
        </button>
      </div>
      <div id="time-options">
        {isComponentVisible && (
          <div id="time-pulldown-wrapper">
            <div ref={ref} id="time-pulldown-btns">
              <button
                className={`pulldown-btn ${
                  clickedMin === "inf" && "active-min-btn"
                }`}
                data-min="inf"
                onClick={chooseTime}
              >
                unlimited
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "1" && "active-min-btn"
                }`}
                data-min="1"
                onClick={chooseTime}
              >
                1 min
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "3" && "active-min-btn"
                }`}
                data-min="3"
                onClick={chooseTime}
              >
                3 min
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "5" && "active-min-btn"
                }`}
                data-min="5"
                onClick={chooseTime}
              >
                5 min
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "10" && "active-min-btn"
                }`}
                data-min="10"
                onClick={chooseTime}
              >
                10 min
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "30" && "active-min-btn"
                }`}
                data-min="30"
                onClick={chooseTime}
              >
                30 min
              </button>
              <button
                className={`pulldown-btn ${
                  clickedMin === "45" && "active-min-btn"
                }`}
                data-min="45"
                onClick={chooseTime}
              >
                45 min
              </button>
            </div>
          </div>
        )}
        <button ref={toggleRef} id="time-options-btn">
          <FontAwesomeIcon icon={faHourglassStart} />
          <span>{minutes ? `${minutes} min` : "unlimited"}</span>
          <FontAwesomeIcon
            icon={isComponentVisible ? faAngleUp : faAngleDown}
            id="time-option-chevron"
          />
        </button>
      </div>
      <button id="start-game-button" onClick={onClickStartGame}>
        Play
      </button>
    </div>
  );
}

export default TeamOptions;
