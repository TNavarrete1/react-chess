// Styles
import "root.css";
import "App.css";
// Components
import ChessBoard from "components/ChessBoard/ChessBoard";
import GameOptions from "components/GameOptions/GameOptions";

function App() {
  return (
    <div id="layout">
      <ChessBoard id="chess-board" />
      <GameOptions id="game-options" />
    </div>
  );
}

export default App;
