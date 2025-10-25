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
// Space Complexity:
//   Best Case (balanced tree): O(log(n))
//   Average Case: O(n)
//   Worst Case (Skewed tree): O(n)
//
// n === number of nodes in the smallest tree
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) {
    return true;
  }
  if (p && q && p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else {
    return false;
  }
}
