// O(n) time | O(n) space
// n is the length of the array
// Uses a dynamic programming solution in which
// we keep track of the maximum sum of non-adjacent
// elements up to the current element.

export function maxSubsetSumNoAdjacent(array: number[]) {
	if (!array.length) return 0;
	if (array.length === 1) return array[0];
	const maxSums = array.slice();
	maxSums[1] = Math.max(array[0], array[1]);
	for (let i = 2; i < array.length; i++) {
		maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
	}
	return maxSums[maxSums.length - 1];
}
