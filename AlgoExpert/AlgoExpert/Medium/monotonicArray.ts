// O(n) Time | O(1) Space
// n is the length of the array
// Uses two booleans to check if the array is non-decreasing or non-increasing

export function isMonotonic(array: number[]) {
	let isNonDecreasing = true;
	let isNonIncreasing = true;
	for (let i = 1; i < array.length; i++) {
		if (array[i] < array[i - 1]) isNonDecreasing = false;
		if (array[i] > array[i - 1]) isNonIncreasing = false;
	}

	return isNonDecreasing || isNonIncreasing;
}
