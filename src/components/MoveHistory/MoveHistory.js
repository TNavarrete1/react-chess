// Styles
import "components/MoveHistory/MoveHistory.css";
// Components
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessBoard,
  faAnglesLeft,
  faAnglesRight,
  faAngleRight,
  faAngleLeft,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

function MoveHistory() {
  const [tabState, setTabState] = useState({ playing: true, newGame: false });

  const handleTabChange = () => {
    setTabState((prev) => {
      return {
        playing: !prev.playing,
        newGame: !prev.newGame,
      };
    });
  };

  return (
    <div id="move-history-wrapper">
      <header id="move-history-header">
        <button
          className={`header-tabs ${tabState.playing ? "active-tab" : ""}`}
          onClick={handleTabChange}
        >
          <FontAwesomeIcon icon={faChessBoard} />
          <span>Playing</span>
        </button>
        <button
          className={`header-tabs ${tabState.newGame ? "active-tab" : ""}`}
          onClick={handleTabChange}
        >
          <FontAwesomeIcon icon={faSquarePlus} />
          <span>New Game</span>
        </button>
      </header>
      <div id="moves-viewer">
        <div className="move"></div>
      </div>
      <div id="move-history-controller">
        <button className="controller-button hover-content-wrapper">
          <FontAwesomeIcon icon={faAnglesLeft} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "10%",
              "--bottom": "calc(100% + 2px)",
            }}
          >
            Beginning
          </div>
        </button>
        <button className="controller-button hover-content-wrapper">
          <FontAwesomeIcon icon={faAngleLeft} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "25%",
              "--bottom": "calc(100% + 2px)",
            }}
          >
            Back
          </div>
        </button>
        <button className="controller-button hover-content-wrapper">
          <FontAwesomeIcon icon={faAngleRight} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "17%",
              "--bottom": "calc(100% + 2px)",
            }}
          >
            Forward
          </div>
        </button>
        <button className="controller-button hover-content-wrapper">
          <FontAwesomeIcon icon={faAnglesRight} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "23%",
              "--bottom": "calc(100% + 2px)",
            }}
          >
            Ending
          </div>
        </button>
      </div>
      <div id="move-history-footer">
        <button id="settings-button">Settings</button>
        <span className="footer-icons hover-content-wrapper">
          <FontAwesomeIcon icon={faFlagCheckered} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "-80%",
              "--bottom": "calc(100% + 10px)",
            }}
          >
            Resign
          </div>
        </span>
      </div>
    </div>
  );
}

export default MoveHistory;
