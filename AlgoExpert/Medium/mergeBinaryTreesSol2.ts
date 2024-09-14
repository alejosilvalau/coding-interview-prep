// O(n) time | O(h) space
// n = number of nodes in the smaller binary tree
// h = is the height of the shorter tree

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

export function mergeBinaryTrees(
	tree1: BinaryTree | null,
	tree2: BinaryTree | null
) {
	if (tree1 === null) return tree2;

	const tree1Stack = [tree1];
	const tree2Stack = [tree2];

	while (tree1Stack.length > 0) {
		const tree1Node = tree1Stack.pop()!;
		const tree2Node = tree2Stack.pop()!;

		if (tree2Node === null) continue;

		tree1Node.value += tree2Node.value;

		if (tree1Node.left === null) {
			tree1Node.left = tree2Node.left;
		} else {
			tree1Stack.push(tree1Node.left);
			tree2Stack.push(tree2Node.left);
		}

		if (tree1Node.right === null) {
			tree1Node.right = tree2Node.right;
		} else {
			tree1Stack.push(tree1Node.right);
			tree2Stack.push(tree2Node.right);
		}
	}
	return tree1;
}
