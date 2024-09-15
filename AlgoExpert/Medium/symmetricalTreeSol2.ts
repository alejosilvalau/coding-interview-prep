// O(n) time | O(h) space
// n is the number of nodes
// h is the height of the tree.
// The space complexity is driven by the open recursive calls on the call stack.
// This is the recursive solution.
// This solution gain in a clearer code.

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
	return treesAreMirrored(tree.left, tree.right);
}

function treesAreMirrored(
	left: BinaryTree | null,
	right: BinaryTree | null
): boolean {
	if (left !== null && right !== null && left.value === right.value) {
		return (
			treesAreMirrored(left.left, right.right) &&
			treesAreMirrored(left.right, right.left)
		);
	}

	return left === right;
}
