// O

export function spiralTraverse(array: number[][]) {
	const result: number[] = [];
	spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, result);
	return result;
}

export function spiralFill(
	array: number[][],
	startRow: number,
	endRow: number,
	startCol: number,
	endCol: number,
	result: number[]
) {
	if (startRow > endRow || startCol > endCol) return;

	for (let col = startCol; col <= endCol; col++) {
		result.push(array[startRow][col]);
	}

	for (let row = startRow + 1; row <= endRow; row++) {
		result.push(array[row][endCol]);
	}

	for (let col = endCol - 1; col >= startCol; col--) {
		if (startRow === endRow) break;
		result.push(array[endRow][col]);
	}

	for (let row = endRow - 1; row > startRow; row--) {
		if (startCol === endCol) break;
		result.push(array[row][startCol]);
	}

	spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
}
