// O(n) time | O(n) space
// n = length of the input array
export function bestDigits(number: string, numDigits: number) {
	const stack: string[] = [];

	for (const digit of number) {
		while (
			numDigits > 0 &&
			stack.length > 0 &&
			digit > stack[stack.length - 1]
		) {
			numDigits--;
			stack.pop();
		}

		stack.push(digit);
	}

	while (numDigits > 0) {
		numDigits--;
		stack.pop();
	}

	return stack.join("");
}
