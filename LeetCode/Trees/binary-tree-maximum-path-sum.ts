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

// Time Complexity: O(n)
// Space Complexity: O(h), which could be:
//  O(log(n)) for a balanced tree
//  O(n) for a skewed tree
//
// n == number of nodes on the tree
// h == height of the tree
function maxPathSum(root: TreeNode | null): number {
  const res = [root!.val];
  dfsMaxPathSum(root, res);
  return res[0];
}

function dfsMaxPathSum(root: TreeNode | null, res: number[]): number {
  // Base Case: If the current node is null, return 0
  if (root === null) {
    return 0;
  }

  // Calculate the maximum branch sum for the left and right subtrees
  const leftMaxSum = Math.max(dfsMaxPathSum(root.left, res), 0);
  const rightMaxSum = Math.max(dfsMaxPathSum(root.right, res), 0);

  // Update the maximum path sum found
  res[0] = Math.max(res[0], root.val + leftMaxSum + rightMaxSum);

  // Return the maximum branch sum including the current node
  return root.val + Math.max(leftMaxSum, rightMaxSum);
}
