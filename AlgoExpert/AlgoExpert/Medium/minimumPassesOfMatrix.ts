// O(w * h) time | O(w * h) space
// w = width of the matrix
// h = height of the matrix
//
// The space complexity comes from the worst case scenario.
// Which is, having all the elements of the matrix be positive
// from the start. This would mean that, all the
// elements of the matrix would be added to the queue.

export function minimumPassesOfMatrix(matrix: number[][]) {
	const passes = convertNegatives(matrix);
	return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix: number[][]) {
	const queue = getAllPositivePositions(matrix);

	let passes = 0;

	while (queue.length > 0) {
		let currentSize = queue.length;

		while (currentSize > 0) {
			const [currentRow, currentCol] = queue.shift()!;

			const adjacentPositions = getAdjacentPositions(
				currentRow,
				currentCol,
				matrix
			);
			for (const position of adjacentPositions) {
				const [row, col] = position;

				const value = matrix[row][col];
				if (value < 0) {
					matrix[row][col] *= -1;
					queue.push([row, col]);
				}
			}
			currentSize--;
		}
		passes++;
	}
	return passes;
}

function getAllPositivePositions(matrix: number[][]) {
	const positivePositions: [number, number][] = [];

	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			const value = matrix[row][col];
			if (value > 0) positivePositions.push([row, col]);
		}
	}
	return positivePositions;
}

function getAdjacentPositions(row: number, col: number, matrix: number[][]) {
	const adjacentPositions: [number, number][] = [];

	if (row > 0) adjacentPositions.push([row - 1, col]);
	if (row < matrix.length - 1) adjacentPositions.push([row + 1, col]);
	if (col > 0) adjacentPositions.push([row, col - 1]);
	if (col < matrix[0].length - 1) adjacentPositions.push([row, col + 1]);

	return adjacentPositions;
}

function containsNegative(matrix: number[][]) {
	for (const row of matrix) {
		for (const value of row) {
			if (value < 0) return true;
		}
	}
	return false;
}
