// O(n) time | O(1) space
// n is the length of the array
// Uses a dynamic programming, but optimized solution in which
// there is no need to store the entire array of maxSums since we
// only need the last two elements to calculate the next element.

export function maxSubsetSumNoAdjacent(array: number[]) {
	if (!array.length) return 0;
	if (array.length === 1) return array[0];
	let second = array[0];
	let first = Math.max(array[0], array[1]);
	for (let i = 2; i < array.length; i++) {
		const current = Math.max(first, second + array[i]);
		second = first;
		first = current;
	}
	return first;
}
