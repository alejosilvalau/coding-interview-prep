import React, { useReducer } from "react";

const NUM_COLS = 7;
const NUM_ROWS = 6;
const NUM_TO_WIN = 4;

export default function ConnectFour() {
  const [{ board, winner, isGameOver }, dispatchBoard] = useReducer(reducer, getEmptyBoard());
}

function Column({ entries, onClick }) {
  return (
    <div className="colum" onClick={onClick}>
      {entries.map((entry, rowIndex) => (
        return (
          <div key={rowIndex} className="tile"> 
            {entry != null && <div className={`player player-${entry}`} />}
          </div>
        );
      ))}
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
        checkForWinner(rowIndex, action.colIndex, -1, -1, boardClone, currentPlayer);

      const winner = isWinnerVertical || isWinnerHorizontal || isWinnerDiagonal ? currentPlayer : null;
      const isBoardFull = boardClone.every(col => col.every(cell => cell != null));
      return {
        board: boardClone,
        currentPlayer: currentPlayer === 1 ? 2 : 1,
        winner,
        isGameOver: winner != null || isBoardFull,
      };
    default:
      throw new Error("Unexpected action type");
  }
}

function getEmptyBoard() {
  return {
    board: new Array(NUM_COLS).fill(null).map(_ => new Array(NUM_ROWS).fill(null)),
    currentPlayer: 1,
    winner: null,
    isGameOver: false,
  };
}

function checkForWinner(startingRow, startingCol, rowIncrement, colIncrement, board, currentPlayer) {
  let numInRow = 0;
  let currentRow = startingRow;
  let currentCol = startingCol;
  while (currentCol < NUM_COLS && currentRow < NUM_ROWS && board[currentCol][currentRow] === currentPlayer) {
    numInRow++;
    currentRow += rowIncrement;
    currentCol += colIncrement;
  }

  currentRow = startingRow - rowIncrement;
  currentCol = startingCol - colIncrement;
  while (currentCol >= 0 && currentRow >= 0 && board[currentCol][currentRow] === currentPlayer) {
    numInRow++;
    currentRow -= rowIncrement;
    currentCol -= colIncrement;
  }

  return numInRow >= NUM_TO_WIN;
}
