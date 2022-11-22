export const getAxesLabels = (boardOrientation, theme) => {
  return [
    {
      id: "1",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 87.5 }
          : { posX: 0, posY: 0 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "y-axis-labels",
    },
    {
      id: "2",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 75 }
          : { posX: 0, posY: 12.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "y-axis-labels",
    },
    {
      id: "3",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 62.5 }
          : { posX: 0, posY: 25 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "y-axis-labels",
    },
    {
      id: "4",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 50 }
          : { posX: 0, posY: 37.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "y-axis-labels",
    },
    {
      id: "5",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 37.5 }
          : { posX: 0, posY: 50 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "y-axis-labels",
    },
    {
      id: "6",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 25 }
          : { posX: 0, posY: 62.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "y-axis-labels",
    },
    {
      id: "7",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 12.5 }
          : { posX: 0, posY: 75 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "y-axis-labels",
    },
    {
      id: "8",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 0 }
          : { posX: 0, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "y-axis-labels",
    },
    {
      id: "a",
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 87.5 }
          : { posX: 87.5, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "x-axis-labels",
    },
    {
      id: "b",
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 87.5 }
          : { posX: 75, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "x-axis-labels",
    },
    {
      id: "c",
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 87.5 }
          : { posX: 62.5, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "x-axis-labels",
    },
    {
      id: "d",
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 87.5 }
          : { posX: 50, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "x-axis-labels",
    },
    {
      id: "e",
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 87.5 }
          : { posX: 37.5, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "x-axis-labels",
    },
    {
      id: "f",
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 87.5 }
          : { posX: 25, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "x-axis-labels",
    },
    {
      id: "g",
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 87.5 }
          : { posX: 12.5, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-light`
          : `color-${theme}-dark`,
      className: "x-axis-labels",
    },
    {
      id: "h",
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 87.5 }
          : { posX: 0, posY: 87.5 },
      color:
        boardOrientation === "white"
          ? `color-${theme}-dark`
          : `color-${theme}-light`,
      className: "x-axis-labels",
    },
  ];
};

export const getBoardPositions = (boardOrientation) => {
  return {
    /*******************************************************
     *                  COLUMN A
     ******************************************************/
    a1: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 87.5 }
          : { posX: 87.5, posY: 0 },
    },
    a2: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 75 }
          : { posX: 87.5, posY: 12.5 },
    },
    a3: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 62.5 }
          : { posX: 87.5, posY: 25 },
    },
    a4: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 50 }
          : { posX: 87.5, posY: 37.5 },
    },
    a5: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 37.5 }
          : { posX: 87.5, posY: 50 },
    },
    a6: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 25 }
          : { posX: 87.5, posY: 62.5 },
    },
    a7: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 12.5 }
          : { posX: 87.5, posY: 75 },
    },
    a8: {
      location:
        boardOrientation === "white"
          ? { posX: 0, posY: 0 }
          : { posX: 87.5, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN B
     ******************************************************/
    b1: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 87.5 }
          : { posX: 75, posY: 0 },
    },
    b2: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 75 }
          : { posX: 75, posY: 12.5 },
    },
    b3: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 62.5 }
          : { posX: 75, posY: 25 },
    },
    b4: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 50 }
          : { posX: 75, posY: 37.5 },
    },
    b5: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 37.5 }
          : { posX: 75, posY: 50 },
    },
    b6: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 25 }
          : { posX: 75, posY: 62.5 },
    },
    b7: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 12.5 }
          : { posX: 75, posY: 75 },
    },
    b8: {
      location:
        boardOrientation === "white"
          ? { posX: 12.5, posY: 0 }
          : { posX: 75, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN C
     ******************************************************/
    c1: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 87.5 }
          : { posX: 62.5, posY: 0 },
    },
    c2: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 75 }
          : { posX: 62.5, posY: 12.5 },
    },
    c3: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 62.5 }
          : { posX: 62.5, posY: 25 },
    },
    c4: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 50 }
          : { posX: 62.5, posY: 37.5 },
    },
    c5: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 37.5 }
          : { posX: 62.5, posY: 50 },
    },
    c6: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 25 }
          : { posX: 62.5, posY: 62.5 },
    },
    c7: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 12.5 }
          : { posX: 62.5, posY: 75 },
    },
    c8: {
      location:
        boardOrientation === "white"
          ? { posX: 25, posY: 0 }
          : { posX: 62.5, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN D
     ******************************************************/
    d1: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 87.5 }
          : { posX: 50, posY: 0 },
    },
    d2: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 75 }
          : { posX: 50, posY: 12.5 },
    },
    d3: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 62.5 }
          : { posX: 50, posY: 25 },
    },
    d4: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 50 }
          : { posX: 50, posY: 37.5 },
    },
    d5: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 37.5 }
          : { posX: 50, posY: 50 },
    },
    d6: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 25 }
          : { posX: 50, posY: 62.5 },
    },
    d7: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 12.5 }
          : { posX: 50, posY: 75 },
    },
    d8: {
      location:
        boardOrientation === "white"
          ? { posX: 37.5, posY: 0 }
          : { posX: 50, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN E
     ******************************************************/
    e1: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 87.5 }
          : { posX: 37.5, posY: 0 },
    },
    e2: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 75 }
          : { posX: 37.5, posY: 12.5 },
    },
    e3: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 62.5 }
          : { posX: 37.5, posY: 25 },
    },
    e4: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 50 }
          : { posX: 37.5, posY: 37.5 },
    },
    e5: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 37.5 }
          : { posX: 37.5, posY: 50 },
    },
    e6: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 25 }
          : { posX: 37.5, posY: 62.5 },
    },
    e7: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 12.5 }
          : { posX: 37.5, posY: 75 },
    },
    e8: {
      location:
        boardOrientation === "white"
          ? { posX: 50, posY: 0 }
          : { posX: 37.5, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN F
     ******************************************************/
    f1: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 87.5 }
          : { posX: 25, posY: 0 },
    },
    f2: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 75 }
          : { posX: 25, posY: 12.5 },
    },
    f3: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 62.5 }
          : { posX: 25, posY: 25 },
    },
    f4: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 50 }
          : { posX: 25, posY: 37.5 },
    },
    f5: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 37.5 }
          : { posX: 25, posY: 50 },
    },
    f6: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 25 }
          : { posX: 25, posY: 62.5 },
    },
    f7: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 12.5 }
          : { posX: 25, posY: 75 },
    },
    f8: {
      location:
        boardOrientation === "white"
          ? { posX: 62.5, posY: 0 }
          : { posX: 25, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN G
     ******************************************************/
    g1: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 87.5 }
          : { posX: 12.5, posY: 0 },
    },
    g2: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 75 }
          : { posX: 12.5, posY: 12.5 },
    },
    g3: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 62.5 }
          : { posX: 12.5, posY: 25 },
    },
    g4: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 50 }
          : { posX: 12.5, posY: 37.5 },
    },
    g5: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 37.5 }
          : { posX: 12.5, posY: 50 },
    },
    g6: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 25 }
          : { posX: 12.5, posY: 62.5 },
    },
    g7: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 12.5 }
          : { posX: 12.5, posY: 75 },
    },
    g8: {
      location:
        boardOrientation === "white"
          ? { posX: 75, posY: 0 }
          : { posX: 12.5, posY: 87.5 },
    },

    /*******************************************************
     *                  COLUMN H
     ******************************************************/
    h1: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 87.5 }
          : { posX: 0, posY: 0 },
    },
    h2: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 75 }
          : { posX: 0, posY: 12.5 },
    },
    h3: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 62.5 }
          : { posX: 0, posY: 25 },
    },
    h4: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 50 }
          : { posX: 0, posY: 37.5 },
    },
    h5: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 37.5 }
          : { posX: 0, posY: 50 },
    },
    h6: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 25 }
          : { posX: 0, posY: 62.5 },
    },
    h7: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 12.5 }
          : { posX: 0, posY: 75 },
    },
    h8: {
      location:
        boardOrientation === "white"
          ? { posX: 87.5, posY: 0 }
          : { posX: 0, posY: 87.5 },
    },
  };
};

export const getBoardSquare = (boardOrientation, posX, posY) => {
  const col = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let colIndex = boardOrientation === "white" ? posX / 12.5 : 7 - posX / 12.5;
  const row = ["1", "2", "3", "4", "5", "6", "7", "8"];
  let rowIndex = boardOrientation === "white" ? 7 - posY / 12.5 : posY / 12.5;

  // Make sure indices are in range
  if (colIndex < 0) {
    colIndex = 0;
  } else if (colIndex > 7) {
    colIndex = 7;
  }
  if (rowIndex < 0) {
    rowIndex = 0;
  } else if (rowIndex > 7) {
    rowIndex = 7;
  }

  return `${col[colIndex]}${row[rowIndex]}`;
};
