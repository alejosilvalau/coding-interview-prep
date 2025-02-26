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
export function repairBst(tree: BST) {
  let nodeOne: BST | null = null;
  let nodeTwo: BST | null = null;
  let previousNode: BST | null = null;

  function inOrderTraversal(node: BST | null) {
    if (node === null) return;

    inOrderTraversal(node.left);

    if (previousNode !== null && previousNode.value > node.value) {
      if (nodeOne === null) nodeOne = previousNode;
      nodeTwo = node;
    }

    previousNode = node;
    inOrderTraversal(node.right);
  }

  inOrderTraversal(tree);

  const temp = nodeOne!.value;
  nodeOne!.value = nodeTwo!.value;
  nodeTwo!.value = temp;
  return tree;
}
