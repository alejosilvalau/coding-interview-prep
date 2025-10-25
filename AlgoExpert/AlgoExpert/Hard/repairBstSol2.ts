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

// O(n) time | O(h) space
// n == number of nodes
// h == height of the tree
// in-order traversal without recursion
export function repairBst(tree: BST) {
  let nodeOne: BST | null = null;
  let nodeTwo: BST | null = null;
  let previousNode: BST | null = null;

  const stack: BST[] = [];
  let currentNode: BST | null = tree;
  while (currentNode !== null || stack.length > 0) {
    while (currentNode !== null) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }
    currentNode = stack.pop()!;

    if (previousNode !== null && previousNode.value > currentNode.value) {
      if (nodeOne === null) nodeOne = previousNode;
      nodeTwo = currentNode;
    }

    previousNode = currentNode;
    currentNode = currentNode.right;
  }

  const temp = nodeOne!.value;
  nodeOne!.value = nodeTwo!.value;
  nodeTwo!.value = temp;
  return tree;
}
