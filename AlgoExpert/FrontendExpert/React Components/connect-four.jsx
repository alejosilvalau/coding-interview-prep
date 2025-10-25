import React, { useReducer } from "react";

const NUM_COL = 7;
const NUM_ROW = 6;
const NUM_TO_WIN = 4;

export default function ConnectFour() {
  const [{ board, winner, isGameOver }, dispatchBoard] = useReducer(reducer, getEmptyBoard());

  return (
    <>
      {winner != null && <h1>Player {winner} Wins</h1>}

      <div className='board'>
        {board.map((colEntries, colIndex) => {
          const onClickCol = () => dispatchBoard({ type: "move", colIndex });
          return <Column key={colIndex} entries={colEntries} onClick={onClickCol} />;
        })}
      </div>

      {isGameOver && (
        <button
          onClick={() => {
            dispatchBoard({ type: "restart" });
          }}
        >
          Restart
        </button>
      )}
    </>
  );
}

function Column({ entries, onClick }) {
  return (
    <div className='column' onClick={onClick}>
      {entries.map((entry, rowIndex) => {
        return (
          <div key={rowIndex} className='tile'>
            {entry != null && <div className={`player player-${entry}`} />}
          </div>
        );
      })}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "restart":
      return getEmptyBoard();
    case "move":
      const relevantCol = state.board[action.colIndex];
      const colIsFull = relevantCol[0] != null;
      if (state.isGameOver || colIsFull) return state;

      const { board, currentPlayer } = state;
      const boardClone = [...board];
      const colClone = [...relevantCol];

      const rowIndex = colClone.lastIndexOf(null);
      colClone[rowIndex] = currentPlayer;
      boardClone[action.colIndex] = colClone;

      const isWinnerVertical = checkForWinner(rowIndex, action.colIndex, 1, 0, boardClone, currentPlayer);
      const isWinnerHorizontal = checkForWinner(rowIndex, action.colIndex, 0, 1, boardClone, currentPlayer);
      const isWinnerDiagonal =
        checkForWinner(rowIndex, action.colIndex, 1, 1, boardClone, currentPlayer) ||
        checkForWinner(rowIndex, action.colIndex, -1, 1, boardClone, currentPlayer);

      const winner = isWinnerVertical || isWinnerHorizontal || isWinnerDiagonal ? currentPlayer : null;
      const isBoardFull = boardClone.every(column => column.every(value => value != null));
      return {
        board: boardClone,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        winner,
        isGameOver: winner != null || isBoardFull,
      };
    default:
      throw new Error("Unexpected action type");
  }
}

function getEmptyBoard() {
  return {
    board: new Array(NUM_COL).fill(null).map(_ => new Array(NUM_ROW).fill(null)),
    currentPlayer: 1,
    winner: null,
    isGameOver: false,
  };
}

function checkForWinner(startingRow, startingCol, rowIncrement, colIncrement, board, currentPlayer) {
  let numInARow = 0;
  let currRow = startingRow;
  let currCol = startingCol;
  while (currCol < NUM_COL && currRow < NUM_ROW && board[currCol][currRow] === currentPlayer) {
    numInARow++;
    currRow += rowIncrement;
    currCol += colIncrement;
  }

  currRow = startingRow - rowIncrement;
  currCol = startingCol - colIncrement;
  while (currCol >= 0 && currRow >= 0 && board[currCol][currRow] === currentPlayer) {
    numInARow++;
    currRow -= rowIncrement;
    currCol -= colIncrement;
  }

  return numInARow >= NUM_TO_WIN;
}
