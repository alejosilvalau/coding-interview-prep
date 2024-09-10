// O(n) time | O(d) space
// n = number of nodes in the tree
// d = depth of the tree
// It uses the depth-first search technique,
// where the recursive calls are stored in the call stack.
// This is the recursive solution.

class BinaryTree {
	value: number;
	left: BinaryTree | null;
	right: BinaryTree | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export function invertBinaryTree(tree: BinaryTree | null) {
	if (tree === null) return;
	swapLeftAndRight(tree);
	invertBinaryTree(tree.left);
	invertBinaryTree(tree.right);
}

function swapLeftAndRight(tree: BinaryTree) {
	const left = tree.left;
	tree.left = tree.right;
	tree.right = left;
}
