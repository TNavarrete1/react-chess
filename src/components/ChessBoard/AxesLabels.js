// Styles
import "components/ChessBoard/AxesLabels.css";
// Components
import { useState, useEffect } from "react";
// Utilites
import { getAxesLabels } from "utilities/board";

function AxesLables({ boardOrientation, theme, width }) {
  const [axesLabels, setAxesLabels] = useState(
    getAxesLabels(boardOrientation, theme)
  );

  useEffect(() => {
    setAxesLabels(getAxesLabels(boardOrientation, theme));
  }, [boardOrientation, theme]);

  return (
    <div id="board-axes-wrapper">
      {axesLabels &&
        axesLabels.map((axesLabel) => {
          return (
            <div
              key={axesLabel.id}
              className="board-axes-labels"
              style={{
                top: `${axesLabel.location.posY}%`,
                left: `${axesLabel.location.posX}%`,
                "--color": `var(--${axesLabel.color})`,
                "--font-size": `${width * 0.03}px`,
              }}
            >
              <div className={axesLabel.className}>{axesLabel.id}</div>
            </div>
          );
        })}
    </div>
  );
}

export default AxesLables;
