/* O(n) time | O(1) space
n is the length of the array

The solution calculates the total sum of the numbers from 1 to the length of the array + 3.
First it subtracts all the numbers in the array from the total sum.
Then calculates an average of the missing numbers, by dividing the total sum by 2.

It proceeds to calculate the sum of the first half of the missing numbers and
of the second half of the missing numbers. With the goal of subtracting
the sum of the numbers in each half of the array and finding the two missing numbers. */

export function missingNumbers(nums: number[]) {
	let total = sum(arrayFromAToB(1, nums.length + 3));

	for (const num of nums) {
		total -= num;
	}

	const averageMissingValue = Math.floor(total / 2);
	let foundFirstHalf = 0;
	let foundSecondHalf = 0;
	for (const num of nums) {
		if (num <= averageMissingValue) {
			foundFirstHalf += num;
		} else {
			foundSecondHalf += num;
		}
	}

	const expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1));
	const expectedSecondHalf = sum(
		arrayFromAToB(averageMissingValue + 1, nums.length + 3)
	);

	return [
		expectedFirstHalf - foundFirstHalf,
		expectedSecondHalf - foundSecondHalf,
	];
}

const arrayFromAToB = (a: number, b: number) => {
	const array: number[] = [];
	for (let num = a; num < b; num++) {
		array.push(num);
	}
	return array;
};

const sum = (array: number[]) => array.reduce((a, b) => a + b);
