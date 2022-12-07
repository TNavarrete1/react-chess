// Styles
import "components/GameOptions/ModeOptions.css";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseSignal, faComputer } from "@fortawesome/free-solid-svg-icons";

function ModeOptions({ handleGameMode, chooseGameMode }) {
  const onClickGameMode = (e) => {
    const gameMode = e.currentTarget.dataset.gamemode;
    handleGameMode(gameMode);
    chooseGameMode();
  };

  return (
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
          style={{ "--color": "var(--bg-dark-yellow)" }}
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
  );
}

export default ModeOptions;
