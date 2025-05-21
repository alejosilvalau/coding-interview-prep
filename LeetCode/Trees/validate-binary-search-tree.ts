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
// O(n) time | O(n) space
// n === number of nodes on the tree
function isValidBST(root: TreeNode | null): boolean {
  return validateBSTSubtree(root, -Infinity, Infinity);
}

function validateBSTSubtree(node: TreeNode | null, minNodeVal: number, maxNodeVal: number): boolean {
  if (!node) return true;

  if (!(minNodeVal < node.val && node.val < maxNodeVal)) return false;

  return validateBSTSubtree(node.left, minNodeVal, node.val) && validateBSTSubtree(node.right, node.val, maxNodeVal);
}
