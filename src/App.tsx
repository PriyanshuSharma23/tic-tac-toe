import { useEffect, useState } from "react";
import "./App.css";

type boxValue = "X" | "O";

function App() {
  const [boardState, setBoardState] = useState<Array<boxValue | "">>(
    new Array(9).fill("")
  );
  const [currentTurn, setCurrentTurn] = useState<boxValue>("X");
  const [hasWon, setHasWon] = useState(false);

  function checkWin(currentTurn: boxValue): void {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let winCondition of winConditions) {
      if (
        boardState[winCondition[0]] !== "" &&
        boardState[winCondition[0]] === boardState[winCondition[1]] &&
        boardState[winCondition[1]] === boardState[winCondition[2]]
      ) {
        setHasWon(true);
      }
    }
  }

  async function updateBoard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    const selectedItemId = parseInt(e.currentTarget.id);

    if (boardState[selectedItemId]) {
      alert("already filled");
      return;
    }
    const newBoardState = await boardState.map((item, index) => {
      if (index === selectedItemId) {
        return currentTurn;
      } else {
        return item;
      }
    });
    setBoardState(newBoardState);
    if (!hasWon) {
      currentTurn === "X" ? setCurrentTurn("O") : setCurrentTurn("X");
    }
    return;
  }

  useEffect(() => {
    setTimeout(() => checkWin(currentTurn), 500);
  }, [boardState]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {!hasWon ? (
        <div className="gameBoard">
          {boardState.map((square, index) => (
            <div
              className="game-square"
              id={`${index}`}
              key={index}
              onClick={(e) => {
                updateBoard(e);
              }}
            >
              {square}
            </div>
          ))}
        </div>
      ) : (
        <div className="win-screen">
          <h2>{`${currentTurn === "O" ? "X" : "O"} has Won!`}</h2>
          <button
            onClick={() => {
              setBoardState(new Array(9).fill(""));
              setHasWon(false);
            }}
          >
            Reset Board
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
