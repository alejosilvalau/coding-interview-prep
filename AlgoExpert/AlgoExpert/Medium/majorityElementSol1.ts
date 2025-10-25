// O(n) time | O(1) space
// n is the length of the input array.
// This solution uses the sliding window techinique.

export function majorityElement(array: number[]) {
	let count = 0;
	let answer: number | null = null;

	for (const value of array) {
		if (count === 0) answer = value;

		if (value === answer) {
			count++;
		} else {
			count--;
		}
	}

	return answer;
}
