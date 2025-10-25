// O(n + m) time
// O(1) space
//
// The time complexity comes from the worst case scenario,
// which is when the target number is on the down-left corner.

type Range = [number, number];

export function searchInSortedMatrix(
	matrix: number[][],
	target: number
): Range {
	let row = 0;
	let col = matrix[0].length - 1;
	while (row < matrix.length && col >= 0) {
		if (matrix[row][col] > target) {
			col--;
		} else if (matrix[row][col] < target) {
			row++;
		} else {
			return [row, col];
		}
	}
	return [-1, -1];
}
