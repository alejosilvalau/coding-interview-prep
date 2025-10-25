// This is an input class. Do not edit.
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

export function evaluateExpressionTree(tree: BinaryTree): number {
	if (tree.value >= 0) return tree.value;

	const leftValue = evaluateExpressionTree(tree.left!);
	const rightValue = evaluateExpressionTree(tree.right!);

	if (tree.value === -1) return leftValue + rightValue;
	if (tree.value === -2) return leftValue - rightValue;
	if (tree.value === -3) return Math.trunc(leftValue / rightValue);

	return leftValue * rightValue;
}
