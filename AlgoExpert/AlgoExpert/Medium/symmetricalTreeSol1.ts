// O(n) time | O(h) space
// n is the number of nodes
// h is the height of the tree. Because of the stacks.
// At any given time, one of the stacks could contain the entire height of the subtree.
// This is the iterative solution.

export class BinaryTree {
	value: number;
	left: BinaryTree | null;
	right: BinaryTree | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export function symmetricalTree(tree: BinaryTree) {
	const stackLeft = [tree.left];
	const stackRight = [tree.right];

	while (stackLeft.length > 0) {
		const left: BinaryTree | null = stackLeft.pop()!;
		const right: BinaryTree | null = stackRight.pop()!;

		if (left === null && right === null) continue;

		if (left === null || right === null || left.value != right.value) {
			return false;
		}

		stackLeft.push(left.left);
		stackLeft.push(left.right);
		stackRight.push(right.right);
		stackRight.push(right.left);
	}

	return true;
}
