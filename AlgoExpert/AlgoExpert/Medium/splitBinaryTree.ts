// O(n) time | O(h) space
// n is the number of nodes
// h is the height of the tree.
// The space complexity is driven by the open recursive calls on the call stack.
// Is a recursive solution.
// It returns the number for which the nodes can be split into two subtrees with equal sum.
// Otherwise, it return 0.

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

export function splitBinaryTree(tree: BinaryTree) {
	const desiredSubtreeSum = getTreeSum(tree) / 2;
	const canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1];
	return canBeSplit ? desiredSubtreeSum : 0;
}

function trySubtrees(
	tree: BinaryTree | null,
	desiredSubtreeSum: number
): [number, boolean] {
	if (tree === null) return [0, false];

	const [leftSum, leftCanBeSplit] = trySubtrees(tree.left, desiredSubtreeSum);
	const [rightSum, rightCanBeSplit] = trySubtrees(
		tree.right,
		desiredSubtreeSum
	);

	const currentTreeSum = tree.value + leftSum + rightSum;
	const canBeSplit =
		leftCanBeSplit || rightCanBeSplit || currentTreeSum === desiredSubtreeSum;
	return [currentTreeSum, canBeSplit];
}

function getTreeSum(tree: BinaryTree | null): number {
	if (tree === null) return 0;
	return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
}
