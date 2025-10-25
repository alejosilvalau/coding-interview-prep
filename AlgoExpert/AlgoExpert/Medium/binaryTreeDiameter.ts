// O(n) time | O(h) space on average, O(n) space on worst
// n = number of nodes in the tree
// h = height of the tree
//
// It uses the depth-first search technique,
// where the recursive calls are stored in the call stack.
//
// This means that if the binary tree is balanced, the space complexity is O(h).
// Otherwise, if the binary tree is more similar to a Linked List, the space
// complexity is O(n).

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

export function binaryTreeDiameter(tree: BinaryTree) {
	return getTreeInfo(tree).diameter;
}

function getTreeInfo(tree: BinaryTree | null): TreeInfo {
	if (tree === null) {
		return new TreeInfo(0, 0);
	}

	const leftTreeInfo = getTreeInfo(tree.left);
	const rightTreeInfo = getTreeInfo(tree.right);

	const longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
	const maxDiameterSoFar = Math.max(
		leftTreeInfo.diameter,
		rightTreeInfo.diameter
	);
	const currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);

	const currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

	return new TreeInfo(currentDiameter, currentHeight);
}

class TreeInfo {
	diameter: number;
	height: number;

	constructor(diameter: number, height: number) {
		this.diameter = diameter;
		this.height = height;
	}
}
