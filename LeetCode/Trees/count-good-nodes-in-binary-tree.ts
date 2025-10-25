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
//   Average Case: O(h)
//   Worst Case (Skewed tree): O(n)
//
// n === number of nodes in the tree
// h === height of the tree
function goodNodes(root: TreeNode | null): number {
  return depthFirstSearch(root, root!.val);
}

function depthFirstSearch(currentNode: TreeNode | null, currentMaxVal: number): number {
  if (!currentNode) return 0;

  const result = currentNode.val >= currentMaxVal ? 1 : 0;
  currentMaxVal = Math.max(currentMaxVal, currentNode.val);
  return (
    result + depthFirstSearch(currentNode.left, currentMaxVal) + depthFirstSearch(currentNode.right, currentMaxVal)
  );
}
