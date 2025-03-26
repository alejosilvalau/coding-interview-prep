// O(h) time | O(1) space
// h = height of the binary tree
//
// The worst case scenario, is when the binary tree is more similar to a Linked List.
// In this case, the space complexity is O(n).

export class BinaryTree {
	value: number;
	left: BinaryTree | null;
	right: BinaryTree | null;
	parent: BinaryTree | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.parent = null;
	}
}

export function findSuccessor(tree: BinaryTree, node: BinaryTree) {
	if (node.right != null) return getLeftmostChild(node.right);
	return getRightmostParent(node);
}

function getLeftmostChild(node: BinaryTree) {
	let currentNode = node;
	while (currentNode.left != null) {
		currentNode = currentNode.left;
	}

	return currentNode;
}

function getRightmostParent(node: BinaryTree) {
	let currentNode = node;
	while (
		currentNode.parent !== null &&
		currentNode.parent.right === currentNode
	) {
		currentNode = currentNode.parent;
	}

	return currentNode.parent;
}
