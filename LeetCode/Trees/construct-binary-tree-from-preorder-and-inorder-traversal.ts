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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  let preOrderIdx = 0;
  let inOrderIdx = 0;

  function depthFirstSearch(limit: number): TreeNode | null {
    // Base case 1, after processing all the nodes return null.
    if (preOrderIdx >= preorder.length) return null;

    // Base case 2, if current inOrderIdx equals to the limit, the branch is complete.
    if (inorder[inOrderIdx] === limit) {
      inOrderIdx++;
      return null;
    }

    // Create the root node for the current subtree.
    let rootNode = new TreeNode(preorder[preOrderIdx]);
    preOrderIdx++;

    // Recursively build the left child, with the limit being the current root's value.
    rootNode.left = depthFirstSearch(rootNode.val);
    // Recursively build the right child, with the limit being the same as the current call.
    rootNode.right = depthFirstSearch(limit);

    return rootNode;
  }

  // Start to build the tree with the limit Infinity, as there s no upper bound for the tree's root.
  return depthFirstSearch(Infinity);
}
