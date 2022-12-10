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
  endGame,
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

  const movePreviewEnd = (e) => {
    previewPosition(moveHistory.length);
  };

  const resign = () => {
    endGame({ resign: true });
  };

  const renderClickableIconWithInfo = (
    btnFunction,
    iconName,
    infoTxt,
    active = true
  ) => {
    const iconContainer = (
      <div className="icon-btn-container hover-content-wrapper">
        <div className="hover-content">{infoTxt}</div>
        <div className="hover-content-carret"></div>
        <button
          className={`controller-button ${active ? "clickable" : ""}`}
          onClick={active ? btnFunction : null}
        >
          <FontAwesomeIcon icon={iconName} />
        </button>
      </div>
    );

    return iconContainer;
  };

  return (
    <div id="game-controller-wrapper">
      <div id="move-history-controller">
        {renderClickableIconWithInfo(
          movePreviewBeginning,
          faAnglesLeft,
          "Start",
          moveHistory && moveHistory.length > 1
        )}
        {renderClickableIconWithInfo(
          movePreviewBackOnce,
          faAngleLeft,
          "Back",
          moveHistory && moveHistory.length > 1
        )}
        {renderClickableIconWithInfo(
          movePreviewForwardOnce,
          faAngleRight,
          "Forward",
          moveHistory && moveHistory.length > 1
        )}
        {renderClickableIconWithInfo(
          movePreviewEnd,
          faAnglesRight,
          "End",
          moveHistory && moveHistory.length > 1
        )}
      </div>
      <div id="move-history-footer">
        <button id="settings-button">Settings</button>
        <div className="footer-icons">
          {renderClickableIconWithInfo(handleBoardFlip, faRotate, "Flip Board")}
          {renderClickableIconWithInfo(resign, faFlagCheckered, "Resign")}
        </div>
      </div>
    </div>
  );
}

export default GameController;
