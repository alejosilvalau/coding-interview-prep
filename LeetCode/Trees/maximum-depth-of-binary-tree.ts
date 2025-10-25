class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// O(n) time | O(n) space
// n == number of nodes on the tree
//
// There is a two-liner recursive solution. But I wanted
// to practice the iterative DFS approach because it
// emulates the recursive call stack of a PC.
function maxDepth(root: TreeNode | null): number {
  const stack: [[TreeNode | null, number]] = [[root, 1]];
  let count: number = 0;

  while (stack.length > 0) {
    const currentPair: [TreeNode | null, number] = stack.pop()!;
    const node: TreeNode | null = currentPair[0];
    const depth: number = currentPair[1];

    if (node) {
      count = Math.max(count, depth);
      stack.push([node.left, depth + 1]);
      stack.push([node.right, depth + 1]);
    }
  }
  return count;
}
