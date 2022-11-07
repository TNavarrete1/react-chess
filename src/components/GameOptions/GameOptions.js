// Styles
import "components/GameOptions/GameOptions.css";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChess,
  faHouseSignal,
  faComputer,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { faChessKing } from "@fortawesome/free-regular-svg-icons";

function GameOptions({
  id,
  team,
  gameMode,
  handleTeamOption,
  handleGameMode,
  handleStartGame,
}) {
  const onClickGameMode = (e) => {
    const gameMode = e.currentTarget.dataset.gamemode;
    handleGameMode(gameMode);
  };

  const onClickTeamOption = (e) => {
    let team = e.currentTarget.dataset.team;
    handleTeamOption(team);
  };

  const onClickStartGame = () => {
    handleStartGame(true);
  };

  return (
    <div id="game-options">
      <header>Play Chess</header>
      <FontAwesomeIcon icon={faChess} id="chess-icon" />
      {gameMode ? (
        <div id="team-list">
          <header>Choose a team: </header>
          <button
            id="white-team-icon"
            className={`team-button ${
              team === "white" ? "team-button-highlight" : ""
            }`}
            data-team="white"
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
            id="random-team-icon"
            className={`team-button ${
              team === "random" ? "team-button-highlight" : ""
            }`}
            data-team="random"
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
            id="black-team-icon"
            className={`team-button ${
              team === "black" ? "team-button-highlight" : ""
            }`}
            data-team="black"
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
      ) : (
        <div id="option-list">
          <header>Choose a gamemode: </header>
          <button
            className="option-button"
            data-gamemode="local"
            onClick={onClickGameMode}
          >
            <FontAwesomeIcon
              icon={faHouseSignal}
              className="option-icon"
              style={{ "--color": "var(--bg-green)" }}
            />
            <h1>Play Local</h1>
            <p>Play against yourself or someone on the same device</p>
          </button>
          <button
            className="option-button"
            data-gamemode="computer"
            onClick={onClickGameMode}
          >
            <FontAwesomeIcon
              icon={faComputer}
              className="option-icon"
              style={{ "--color": "var(--bg-blue)" }}
            />
            <h1>Computer</h1>
            <p>Play against the computer</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default GameOptions;
