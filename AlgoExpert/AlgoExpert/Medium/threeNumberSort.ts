// O(n) time | O(1) space
// n = length of the array
//
// It uses the subarray technique.
export function threeNumberSort(array: number[], order: number[]) {
	const firstValue = order[0];
	const secondValue = order[1];

	let firstIdx = 0;
	let secondIdx = 0;
	let thirdIdx = array.length - 1;

	while (secondIdx <= thirdIdx) {
		const value = array[secondIdx];

		if (value === firstValue) {
			swap(firstIdx, secondIdx, array);
			firstIdx++;
			secondIdx++;
		} else if (value === secondValue) {
			secondIdx++;
		} else {
			swap(secondIdx, thirdIdx, array);
			thirdIdx -= 1;
		}
	}

	return array;
}

function swap(i: number, j: number, array: number[]) {
	const temp = array[j];
	array[j] = array[i];
	array[i] = temp;
}
