// O(n) time | O(n) space
// n = number of nodes in the tree
// It takes n space, because we are storing the values of the nodes in an array.
// Otherwise, it would take O(d) space, due to the recursive calls, where d is the depth of the tree.
// Meaning that it would occupy d frames on the call stack.

class BST {
	value: number;
	left: BST | null;
	right: BST | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export function inOrderTraverse(tree: BST | null, array: number[]) {
	if (tree !== null) {
		inOrderTraverse(tree.left, array);
		array.push(tree.value);
		inOrderTraverse(tree.right, array);
	}
	return array;
}

export function preOrderTraverse(tree: BST | null, array: number[]) {
	if (tree !== null) {
		array.push(tree.value);
		preOrderTraverse(tree.left, array);
		preOrderTraverse(tree.right, array);
	}
	return array;
}

export function postOrderTraverse(tree: BST | null, array: number[]) {
	if (tree !== null) {
		postOrderTraverse(tree.left, array);
		postOrderTraverse(tree.right, array);
		array.push(tree.value);
	}
	return array;
}
