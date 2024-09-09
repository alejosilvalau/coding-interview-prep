// O(n) time | O(n) space
// n = number of nodes in the tree = number of elements in the array
// It uses the sliding window technique

export class BST {
	value: number;
	left: BST | null;
	right: BST | null;

	constructor(
		value: number,
		left: BST | null = null,
		right: BST | null = null
	) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

class TreeInfo {
	rootIdx: number;

	constructor(rootIdx: number) {
		this.rootIdx = rootIdx;
	}
}

export function reconstructBst(preOrderTraversalValues: number[]): BST | null {
	const treeInfo = new TreeInfo(0);
	return reconstructBstFromRange(
		-Infinity,
		Infinity,
		preOrderTraversalValues,
		treeInfo
	);
}

function reconstructBstFromRange(
	lowerBound: number,
	upperBound: number,
	preOrderTraversalValues: number[],
	currentSubtreeInfo: TreeInfo
): BST | null {
	if (currentSubtreeInfo.rootIdx === preOrderTraversalValues.length)
		return null;

	const rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
	if (rootValue < lowerBound || rootValue >= upperBound) return null;

	currentSubtreeInfo.rootIdx++;
	const leftSubtree = reconstructBstFromRange(
		lowerBound,
		rootValue,
		preOrderTraversalValues,
		currentSubtreeInfo
	);
	const rightSubtree = reconstructBstFromRange(
		rootValue,
		upperBound,
		preOrderTraversalValues,
		currentSubtreeInfo
	);
	return new BST(rootValue, leftSubtree, rightSubtree);
}
