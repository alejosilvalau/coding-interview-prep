class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(log(n)) space
// The O(log(n)) is considering that the tree is a perfectly
// balanced Binary Tree. On the worse case scenario the tree
// is just a list, therefore it would take up to O(n) space.
export function maxPathSum(tree: BinaryTree) {
  const [_, maxSum] = findMaxSum(tree);
  return maxSum;
}

function findMaxSum(tree: BinaryTree | null) {
  if (tree === null) return [0, -Infinity];

  const [leftMaxSumAsBranch, leftMaxPathSum] = findMaxSum(tree.left);
  const [rightMaxSumAsBranch, rightMaxPathSum] = findMaxSum(tree.right);
  const maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);

  const { value } = tree;
  const maxSumAsBranch = Math.max(maxChildSumAsBranch + value, value);

  const maxSumAsRootNode = Math.max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch);
  const maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode);

  return [maxSumAsBranch, maxPathSum];
}
