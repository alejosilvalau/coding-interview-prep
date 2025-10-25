// O(n) Time | O(n) Space.
// n is the length of the input array.
// Uses a set, and that's why it uses O(n) space.

export function firstDuplicateValue(array: number[]) {
	const seen = new Set();
	for (const value of array) {
		if (seen.has(value)) return value;
		seen.add(value);
	}
	return -1;
}
