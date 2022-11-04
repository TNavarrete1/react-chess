// Styles
import "components/GameOptions/GameOptions.css";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChess,
  faHouseSignal,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";

function GameOptions({ id, handleTeamOption }) {
  const onClick = () => {
    handleTeamOption("black");
  };

  return (
    <div id={id}>
      <header>Play Chess</header>
      <FontAwesomeIcon icon={faChess} id="chess-icon" />
      <div id="option-list">
        <header>Choose a gamemode: </header>
        <button className="option-button" onClick={onClick}>
          <FontAwesomeIcon
            icon={faHouseSignal}
            className="option-icon"
            style={{ "--color": "var(--bg-green)" }}
          />
          <h1>Play Local</h1>
          <p>Play against yourself or someone on the same device</p>
        </button>
        <button className="option-button" onClick={onClick}>
          <FontAwesomeIcon
            icon={faComputer}
            className="option-icon"
            style={{ "--color": "var(--bg-blue)" }}
          />
          <h1>Computer</h1>
          <p>Play against the computer</p>
        </button>
      </div>
    </div>
  );
}

export default GameOptions;
