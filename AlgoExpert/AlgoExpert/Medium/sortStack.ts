// O(n^2) time | O(n) space
// n = length of the stack
//
// The worst time complexity comes when you have all the rest of
// the stack is sorted, and there is only one element remaining. Which
// is minor than the first element inserted on the stack.
//
// In this case, the algorithm needs to remove all the elements,
// to insert that last element at the first position of the stack.
// Meaning that it would open O(n) recursive calls on the call stack
// Only for that remaining element

export function sortStack(stack: number[]) {
	if (stack.length === 0) return stack;

	const top = stack.pop()!;

	sortStack(stack);

	insertInSortedOrder(stack, top);

	return stack;
}

function insertInSortedOrder(stack: number[], value: number) {
	if (stack.length === 0 || stack[stack.length - 1] <= value) {
		stack.push(value);
		return;
	}

	const top = stack.pop()!;

	insertInSortedOrder(stack, value);

	stack.push(top);
}
