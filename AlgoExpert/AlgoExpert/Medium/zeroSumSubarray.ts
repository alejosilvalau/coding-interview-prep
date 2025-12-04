// O(n) Time | O(n) Space
// n is the length of the array
// It sums all the elements linearly, if there is
// a result of the sum that has already been calculated before
// THen there is a Zero Sum Subarray inside.
// Uses an auxiliary Set to check for the repeated sum of the elements in the array.

export function zeroSumSubarray(nums: number[]) {
	const sums = new Set([0]);
	let currentSum = 0;
	for (const num of nums) {
		currentSum += num;
		if (sums.has(currentSum)) return true;
		sums.add(currentSum);
	}

	return false;
}
