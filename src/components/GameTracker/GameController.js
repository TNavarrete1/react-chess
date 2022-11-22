// Styles
import "components/GameTracker/GameController.css";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleRight,
  faAngleLeft,
  faFlagCheckered,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

function GameController({
  moveHistory,
  moveNum,
  handleBoardFlip,
  previewPosition,
}) {
  const movePreviewBackOnce = () => {
    if (moveNum - 1 === -1) {
      return;
    }
    previewPosition(moveNum - 1);
  };

  const movePreviewForwardOnce = () => {
    if (moveNum + 1 === moveHistory.length + 1) {
      return;
    }
    previewPosition(moveNum + 1);
  };

  const movePreviewBeginning = () => {
    previewPosition(0);
  };

  const movePreviewEnd = () => {
    previewPosition(moveHistory.length);
  };

  return (
    <div id="game-controller-wrapper">
      <div id="move-history-controller">
        <button
          className="controller-button hover-content-wrapper"
          onClick={
            moveHistory && moveHistory.length > 1 ? movePreviewBeginning : null
          }
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
          <div
            className="hover-content"
            style={{
              "--left": "50%",
              "--right": "5%",
              "--bottom": "calc(100% - 2px)",
            }}
          >
            Beginning
          </div>
        </button>
        <button
          className="controller-button hover-content-wrapper"
          onClick={
            moveHistory && moveHistory.length > 1 ? movePreviewBackOnce : null
          }
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <div
            className="hover-content"
            style={{
              "--left": "calc(50% - 5px)",
              "--right": "20%",
              "--bottom": "calc(100% - 2px)",
            }}
          >
            Back
          </div>
        </button>
        <button
          className="controller-button hover-content-wrapper"
          onClick={
            moveHistory && moveHistory.length > 1
              ? movePreviewForwardOnce
              : null
          }
        >
          <FontAwesomeIcon icon={faAngleRight} />
          <div
            className="hover-content"
            style={{
              "--left": "47.5%",
              "--right": "10%",
              "--bottom": "calc(100% - 2px)",
            }}
          >
            Forward
          </div>
        </button>
        <button
          className="controller-button hover-content-wrapper"
          onClick={
            moveHistory && moveHistory.length > 1 ? movePreviewEnd : null
          }
        >
          <FontAwesomeIcon icon={faAnglesRight} />
          <div
            className="hover-content"
            style={{
              "--left": "52%",
              "--right": "23%",
              "--bottom": "calc(100% - 2px)",
            }}
          >
            Ending
          </div>
        </button>
      </div>
      <div id="move-history-footer">
        <button id="settings-button">Settings</button>
        <div className="footer-icons">
          <span className="hover-content-wrapper" onClick={handleBoardFlip}>
            <FontAwesomeIcon icon={faRotate} />
            <div
              className="hover-content"
              style={{
                "--left": "53%",
                "--right": "-80%",
                "--bottom": "calc(100% + 10px)",
              }}
            >
              Flip Board
            </div>
          </span>
          <span className="hover-content-wrapper">
            <FontAwesomeIcon icon={faFlagCheckered} />
            <div
              className="hover-content"
              style={{
                "--left": "57%",
                "--right": "-80%",
                "--bottom": "calc(100% + 10px)",
              }}
            >
              Resign
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GameController;
