// O(n) time | O(n) space
// n = number of tokens
export function reversePolishNotation(tokens: string[]) {
	const stack: number[] = [];

	for (const token of tokens) {
		if (token === "+") {
			stack.push(stack.pop()! + stack.pop()!);
		} else if (token === "-") {
			const firstNum = stack.pop()!;
			stack.push(stack.pop()! - firstNum);
		} else if (token === "*") {
			stack.push(stack.pop()! * stack.pop()!);
		} else if (token === "/") {
			const firstNum = stack.pop()!;
			stack.push(Math.trunc(stack.pop()! / firstNum));
		} else {
			stack.push(parseInt(token));
		}
	}

	return stack.pop();
}
