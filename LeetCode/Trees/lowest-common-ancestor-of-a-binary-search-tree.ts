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

// O(h) time | O(1) space
// h === height of the BST
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // Make a reference to the head of the BST
  let currentNode: TreeNode | null = root;

  while (currentNode) {
    // Check if the two nodes values are higher than the currentNode value
    if (p!.val > currentNode.val && q!.val > currentNode.val) currentNode = currentNode.right;
    // Check if the two nodes values are lower than the currentNode value
    else if (p!.val < currentNode.val && q!.val < currentNode.val) currentNode = currentNode.left;
    // Otherwise, you found the lowest common ancestor
    else return currentNode;
  }

  return null;
}
