// Initial Board structure
export const initBoard = (team) => {
  return [
    /*****************************************************
                    Black Pieces
   ***********************************************/
    {
      id: 0,
      location:
        team === "white" ? { posX: 0, posY: 0 } : { posX: 0, posY: 87.5 },
      piece: "piece br",
      team: "black",
    },
    {
      id: 1,
      location:
        team === "white" ? { posX: 12.5, posY: 0 } : { posX: 12.5, posY: 87.5 },
      piece: "piece bn",
      team: "black",
    },
    {
      id: 2,
      location:
        team === "white" ? { posX: 25, posY: 0 } : { posX: 25, posY: 87.5 },
      piece: "piece bb",
      team: "black",
    },
    {
      id: 3,
      location:
        team === "white" ? { posX: 37.5, posY: 0 } : { posX: 37.5, posY: 87.5 },
      piece: "piece bq",
      team: "black",
    },
    {
      id: 4,
      location:
        team === "white" ? { posX: 50, posY: 0 } : { posX: 50, posY: 87.5 },
      piece: "piece bk",
      team: "black",
    },
    {
      id: 5,
      location:
        team === "white" ? { posX: 62.5, posY: 0 } : { posX: 62.5, posY: 87.5 },
      piece: "piece bb",
      team: "black",
    },
    {
      id: 6,
      location:
        team === "white" ? { posX: 75, posY: 0 } : { posX: 75, posY: 87.5 },
      piece: "piece bn",
      team: "black",
    },
    {
      id: 7,
      location:
        team === "white" ? { posX: 87.5, posY: 0 } : { posX: 87.5, posY: 87.5 },
      piece: "piece br",
      team: "black",
    },
    {
      id: 8,
      location:
        team === "white" ? { posX: 0, posY: 12.5 } : { posX: 0, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 9,
      location:
        team === "white"
          ? { posX: 12.5, posY: 12.5 }
          : { posX: 12.5, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 10,
      location:
        team === "white" ? { posX: 25, posY: 12.5 } : { posX: 25, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 11,
      location:
        team === "white"
          ? { posX: 37.5, posY: 12.5 }
          : { posX: 37.5, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 12,
      location:
        team === "white" ? { posX: 50, posY: 12.5 } : { posX: 50, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 13,
      location:
        team === "white"
          ? { posX: 62.5, posY: 12.5 }
          : { posX: 62.5, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 14,
      location:
        team === "white" ? { posX: 75, posY: 12.5 } : { posX: 75, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    {
      id: 15,
      location:
        team === "white"
          ? { posX: 87.5, posY: 12.5 }
          : { posX: 87.5, posY: 75 },
      piece: "piece bp",
      team: "black",
    },
    /************************************************
                    Black Pieces
   ****************************************************/

    /*****************************************************
                    White Pieces
   ***********************************************/
    {
      id: 16,
      location:
        team === "white" ? { posX: 0, posY: 75 } : { posX: 0, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 17,
      location:
        team === "white"
          ? { posX: 12.5, posY: 75 }
          : { posX: 12.5, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 18,
      location:
        team === "white" ? { posX: 25, posY: 75 } : { posX: 25, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 19,
      location:
        team === "white"
          ? { posX: 37.5, posY: 75 }
          : { posX: 37.5, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 20,
      location:
        team === "white" ? { posX: 50, posY: 75 } : { posX: 50, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 21,
      location:
        team === "white"
          ? { posX: 62.5, posY: 75 }
          : { posX: 62.5, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 22,
      location:
        team === "white" ? { posX: 75, posY: 75 } : { posX: 75, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 23,
      location:
        team === "white"
          ? { posX: 87.5, posY: 75 }
          : { posX: 87.5, posY: 12.5 },
      piece: "piece wp",
      team: "white",
    },
    {
      id: 24,
      location:
        team === "white" ? { posX: 0, posY: 87.5 } : { posX: 0, posY: 0 },
      piece: "piece wr",
      team: "white",
    },
    {
      id: 25,
      location:
        team === "white" ? { posX: 12.5, posY: 87.5 } : { posX: 12.5, posY: 0 },
      piece: "piece wn",
      team: "white",
    },
    {
      id: 26,
      location:
        team === "white" ? { posX: 25, posY: 87.5 } : { posX: 25, posY: 0 },
      piece: "piece wb",
      team: "white",
    },
    {
      id: 27,
      location:
        team === "white" ? { posX: 37.5, posY: 87.5 } : { posX: 37.5, posY: 0 },
      piece: "piece wq",
      team: "white",
    },
    {
      id: 28,
      location:
        team === "white" ? { posX: 50, posY: 87.5 } : { posX: 50, posY: 0 },
      piece: "piece wk",
      team: "white",
    },
    {
      id: 29,
      location:
        team === "white" ? { posX: 62.5, posY: 87.5 } : { posX: 62.5, posY: 0 },
      piece: "piece wb",
      team: "white",
    },
    {
      id: 30,
      location:
        team === "white" ? { posX: 75, posY: 87.5 } : { posX: 75, posY: 0 },
      piece: "piece wn",
      team: "white",
    },
    {
      id: 31,
      location:
        team === "white" ? { posX: 87.5, posY: 87.5 } : { posX: 87.5, posY: 0 },
      piece: "piece wr",
      team: "white",
    },
    /************************************************
                    White Pieces
   ****************************************************/
  ];
};
