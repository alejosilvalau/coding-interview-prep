// O(n) time | O(1) space
// n is the length of the input array.
// Uses bit manipulation, with bitwise operations

export function majorityElement(array: number[]) {
	let answer = 0;

	for (let currentBit = 0; currentBit < 32; currentBit++) {
		const currentBitValue = 1 << currentBit;
		let onesCount = 0;

		for (const num of array) {
			if ((num & currentBitValue) !== 0) onesCount++;
		}

		if (onesCount > array.length / 2) answer += currentBitValue;
	}

	return answer;
}
