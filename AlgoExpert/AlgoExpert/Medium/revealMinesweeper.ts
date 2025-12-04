// O(w * h) time | O(w * h) time
// w = width of the board
// h = height of the board
//
// The time complexity comes from the recursive call stack.
// The worst case scenario is to traverse through all the board
// all at once, which means O(w * h).
export function revealMinesweeper(board: string[][], row: number, col: number) {
	if (board[row][col] === "M") {
		board[row][col] = "X";
		return board;
	}

	const neighbors = getNeighbors(board, row, col);
	let adjacentMinesCount = 0;
	for (const [neighborRow, neighborCol] of neighbors) {
		if (board[neighborRow][neighborCol] === "M") {
			adjacentMinesCount += 1;
		}
	}

	if (adjacentMinesCount > 0) {
		board[row][col] = adjacentMinesCount.toString();
	} else {
		board[row][col] = "0";
		for (const [neighborRow, neighborCol] of neighbors) {
			if (board[neighborRow][neighborCol] === "H") {
				revealMinesweeper(board, neighborRow, neighborCol);
			}
		}
	}

	return board;
}

function getNeighbors(board: string[][], row: number, col: number) {
	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	];
	const neighbors: [number, number][] = [];
	for (const [directionRow, directionCol] of directions) {
		const newRow = row + directionRow;
		const newCol = col + directionCol;
		if (
			0 <= newRow &&
			newRow < board.length &&
			0 <= newCol &&
			newCol < board[0].length
		) {
			neighbors.push([newRow, newCol]);
		}
	}

	return neighbors;
}
