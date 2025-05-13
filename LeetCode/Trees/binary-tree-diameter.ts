/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// Time: O(n)
// Space: O(h), which could be:
// O(log(n)) for a balanced tree
// O(n) for a skewed tree
//
// n == number of nodes on the tree
// h == height of the tree
function diameterOfBinaryTree(root: TreeNode | null): number {
  // Declare res as an array to be able to pass it by reference
  const res = [0];
  dfs(root, res);
  return res[0];
}

function dfs(root: TreeNode | null, res: number[]) {
  if (root === null) {
    return 0;
  }
  const left: number = dfs(root.left, res);
  const right: number = dfs(root.right, res);
  res[0] = Math.max(res[0], left + right);
  return 1 + Math.max(left, right);
}
