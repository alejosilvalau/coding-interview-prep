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
// n === the number of nodes in the binary tree
function levelOrder(root: TreeNode | null): number[][] {
  let result: number[][] = [];
  if (!root) return result;

  // Create a queue to hold the nodes at each level
  const queue: (TreeNode | null)[] = [];
  queue.push(root);

  // While there are nodes in the queue, process each level
  while (queue.length > 0) {
    // Create an array to hold the values of the current level
    let currentLevel: number[] = [];
    const levelSize = queue.length;

    // Process each node in the current level
    for (let idx = 0; idx < levelSize; idx++) {
      let currentNode = queue.shift();

      // If the current node is not null, add its value to the current level
      // and add its children to the queue
      if (currentNode) {
        currentLevel.push(currentNode.val);
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }
    // If the current level has any nodes, add it to the result
    if (currentLevel.length > 0) result.push(currentLevel);
  }
  return result;
}
