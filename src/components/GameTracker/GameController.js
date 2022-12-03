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

  const movePreviewEnd = (e) => {
    previewPosition(moveHistory.length);
  };

  const renderClickableIconWithInfo = (btnFunction, iconName, infoTxt) => {
    const iconContainer = (
      <div className="icon-btn-container hover-content-wrapper">
        <div className="hover-content">{infoTxt}</div>
        <div className="hover-content-carret"></div>
        <button
          className="controller-button"
          onClick={moveHistory && moveHistory.length > 1 ? btnFunction : null}
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
          "Start"
        )}
        {renderClickableIconWithInfo(movePreviewBackOnce, faAngleLeft, "Back")}
        {renderClickableIconWithInfo(
          movePreviewForwardOnce,
          faAngleRight,
          "Forward"
        )}
        {renderClickableIconWithInfo(movePreviewEnd, faAnglesRight, "End")}
      </div>
      <div id="move-history-footer">
        <button id="settings-button">Settings</button>
        <div className="footer-icons">
          {renderClickableIconWithInfo(handleBoardFlip, faRotate, "Flip Board")}
          {renderClickableIconWithInfo(null, faFlagCheckered, "Resign")}
        </div>
      </div>
    </div>
  );
}

export default GameController;
