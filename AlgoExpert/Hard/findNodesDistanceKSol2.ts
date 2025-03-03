// The goal is to find the nodes at a
// distance k from the node with
// the target value.

// O(n) time | O(n) space

// The O(n) time comes from the assumption
// that a BFS algorithm takes O(v + e) time, with "v"
// being the nodes / vertices and "e" being the number of
// edges. As the number of edges is less than the number of
// nodes, then O(v + e) < O(2n) ~= O(n).

// O(n) space comes from the set or the parents
// dictionary structure used.
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

export function findNodesDistanceK(tree: BinaryTree, target: number, k: number) {
  const nodesDistanceK: number[] = [];
  findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
  return nodesDistanceK;
}

function findDistanceFromNodeToTarget(
  node: BinaryTree | null,
  target: number,
  k: number,
  nodesDistanceK: number[]
): number {
  if (node === null) return -1;

  if (node.value === target) {
    addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
    return 1;
  }

  const leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
  const rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

  if (leftDistance === k || rightDistance === k) nodesDistanceK.push(node.value);

  if (leftDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
    return leftDistance + 1;
  }

  if (rightDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
    return rightDistance + 1;
  }

  return -1;
}

function addSubtreeNodeAtDistanceK(node: BinaryTree | null, distance: number, k: number, nodesDistanceK: number[]) {
  if (node === null) return;

  if (distance === k) nodesDistanceK.push(node.value);
  else {
    addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
    addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
  }
}
