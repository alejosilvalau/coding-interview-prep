const BOARD_WIDTH = 3;

// If the game squares were numbered from 0 to 8.
const WIN_CONDITIONS = [
	[0, 1, 2], // first row
	[3, 4, 5], // second row
	[6, 7, 8], // third row
	[0, 3, 6], // first column
	[1, 4, 7], // second column
	[2, 5, 8], // third column
	[0, 4, 8], // first diagonal
	[2, 4, 6], // second diagonal
];

let currentPlayer = 1;
let numMovesDone = 0;

const gameHeading = document.getElementById("game-heading");
const gameSquares = document.querySelectorAll(".game-square");
const restartButton = document.getElementById("restart-button");

gameSquares.forEach((gameSquare, i) => {
	gameSquare.addEventListener("click", () => {
		makeMove(gameSquare);
	});
});

restartButton.addEventListener("click", restartGame);

function makeMove(gameSquare) {
	gameSquare.textContent = currentPlayer === 1 ? "X" : "O";
	gameSquare.disabled = true;
	numMovesDone++;

	if (didPlayerWin()) {
		gameHeading.textContent = `Player ${currentPlayer} Won!`;
		endGame();
	} else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
		gameHeading.textContent = "Tie Game!";
		endGame();
	} else {
		currentPlayer = currentPlayer === 1 ? 2 : 1;
		setCurrentPlayerHeader();
	}
}

function didPlayerWin() {
	const relevantText = currentPlayer === 1 ? "X" : "O";

	return WIN_CONDITIONS.some((condition) => {
		return condition.every((gameSquarePosition) => {
			return gameSquares[gameSquarePosition].textContent === relevantText;
		});
	});
}

function endGame() {
	restartButton.style.display = "block";
	gameSquares.forEach((gameSquare) => {
		gameSquare.disabled = true;
	});
}

function restartGame() {
	currentPlayer = 1;
	numMovesDone = 0;
	setCurrentPlayerHeader();
	gameSquares.forEach((gameSquare) => {
		gameSquare.textContent = "";
		gameSquare.disabled = false;
	});
	restartButton.style.display = "none";
}

function setCurrentPlayerHeader() {
	gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}