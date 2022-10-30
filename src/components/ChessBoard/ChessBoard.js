import useBoard from "hooks/useBoard";

const initBoard = [
  [
    {
      location: [1, "A"],
      piece: "",
    },
  ],
];

function ChessBoard() {
  const [board, setBoard] = useBoard();

  return null;
}

export default ChessBoard;
