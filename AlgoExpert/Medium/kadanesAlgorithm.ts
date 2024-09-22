// O(n) time | O(1) space
// n = length of the input array
// It uses Dynamic Programming.

export function kadanesAlgorithm(array: number[]) {
	let maxEndingHere = array[0];
	let maxSoFar = array[0];
	for (let i = 1; i < array.length; i++) {
		const num = array[i];
		maxEndingHere = Math.max(num, maxEndingHere + num);
		maxSoFar = Math.max(maxSoFar, maxEndingHere);
	}
	return maxSoFar;
}
