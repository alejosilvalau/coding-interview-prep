// O(n) time | O(n) space
// n = length of the string
export function balancedBrackets(string: string) {
	const openingBrackets = "([{";
	const closingBrackets = ")]}";
	const matchingBrackets: { [key: string]: string } = {
		")": "(",
		"]": "[",
		"}": "{",
	};
	const stack: string[] = [];
	for (const char of string) {
		if (openingBrackets.includes(char)) {
			stack.push(char);
		} else if (closingBrackets.includes(char)) {
			if (stack.length === 0) {
				return false;
			}
			if (stack[stack.length - 1] === matchingBrackets[char]) {
				stack.pop();
			} else {
				return false;
			}
		}
	}
	return stack.length === 0;
}
