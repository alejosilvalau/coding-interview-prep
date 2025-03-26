// O(h + k) time | O(h) space
// h == height of the tree
// k == input parameter
// O(h) space is due to the frames used in the call stack

export class BST {
	value: number;
	left: BST | null;
	right: BST | null;

	constructor(value: number) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class TreeInfo {
	numberOfNodesVisited: number;
	lastestVisitedNodeValue: number;

	constructor(numberOfNodesVisited: number, lastestVisitedNodeValue: number) {
		this.numberOfNodesVisited = numberOfNodesVisited;
		this.lastestVisitedNodeValue = lastestVisitedNodeValue;
	}
}

export function findKthLargestValueInBst(tree: BST, k: number) {
	const treeInfo = new TreeInfo(0, -1);
	reverseInOrderTraverse(tree, k, treeInfo);
	return treeInfo.lastestVisitedNodeValue;
}

function reverseInOrderTraverse(
	node: BST | null,
	k: number,
	treeInfo: TreeInfo
) {
	if (node === null || treeInfo.numberOfNodesVisited >= k) return;

	reverseInOrderTraverse(node.right, k, treeInfo);
	if (treeInfo.numberOfNodesVisited < k) {
		treeInfo.numberOfNodesVisited++;
		treeInfo.lastestVisitedNodeValue = node.value;
		reverseInOrderTraverse(node.left, k, treeInfo);
	}
}
