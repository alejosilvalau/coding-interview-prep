/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

// O(n) time | O(n) space
// n === the number of nodes in the binary tree
function rightSideView(root: TreeNode | null): number[] {
  const response: number[] = [];
  const queue: (TreeNode | null)[] = [];

  queue.push(root);

  while (queue.length > 0) {
    let rightSideNode = null;
    const currentQueueLength = queue.length;

    for (let idx = 0; idx < currentQueueLength; idx++) {
      const currentNode = queue.shift();
      if (currentNode) {
        rightSideNode = currentNode;
        queue.push(currentNode.left);
        queue.push(currentNode.right);
      }
    }
    if (rightSideNode) {
      response.push(rightSideNode.val);
    }
  }
  return response;
}
