// O(n) Time | O(1) Space.
// n is the length of the input array.
// Uses the given array as a hash table, changing the
// sign of the value at the index of the value.

export function firstDuplicateValue(array: number[]) {
	for (const value of array) {
		const absValue = Math.abs(value);
		if (array[absValue - 1] < 0) return absValue;
		array[absValue - 1] *= -1;
	}
	return -1;
}
