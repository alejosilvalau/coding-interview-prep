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
//
// This is an iterative DFS, there is a much shorter approach with recursion.
function kthSmallest(root: TreeNode | null, k: number): number | undefined {
  let stack: (TreeNode | null)[] = [];
  let currentNode: TreeNode | null = root;

  while (stack.length > 0 || currentNode !== null) {
    while (currentNode !== null) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }
    currentNode = stack.pop()!;
    k--;
    if (k === 0) {
      return currentNode.val;
    }
    currentNode = currentNode.right;
  }
}
