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

// O(h) time | O(1) space
// h == height of the tree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo);
  if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo);
  return false;
}

function isDescendant(node: BST, target: BST) {
  let currentNode: BST | null = node;
  while (currentNode !== null && currentNode !== target) {
    currentNode = target.value < currentNode.value ? currentNode.left : currentNode.right;
  }

  return currentNode === target;
}
