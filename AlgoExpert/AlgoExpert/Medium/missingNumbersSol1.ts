// O(n) time | O(n) space
// n is the length of the array
//
// Uses a set and a for loop. First adds all the elements of the array to a set
// Then iterates from 1 to the length of the array + 3 and checks if the number is in the set
// If it is not, then it is added to the solution array.

export function missingNumbers(nums: number[]) {
	const includedNums = new Set(nums);

	const solution: number[] = [];
	for (let num = 1; num < nums.length + 3; num++) {
		if (!includedNums.has(num)) solution.push(num);
	}
	return solution;
}
