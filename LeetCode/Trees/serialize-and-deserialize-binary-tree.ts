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
// n === number of nodes in the tree
//Encodes a tree to a single string using pre-order traversal.
function serialize(root: TreeNode | null): string {
  const result: string[] = [];
  dfsSerialize(root, result);
  return result.join(',');
}

function dfsSerialize(node: TreeNode | null, result: string[]) {
  if (node === null) {
    result.push('null');
    return;
  }

  result.push(node.val.toString());
  dfsSerialize(node.left, result);
  dfsSerialize(node.right, result);
}

// O(n) time | O(n) space
// n === number of nodes in the tree
//Decodes your encoded data to tree.
function deserialize(data: string): TreeNode | null {
  const treeValues: string[] = data.split(',');

  // Create an index object to keep track of the current position in the array
  // This is necessary because we need to pass the index by reference
  const idx = { val: 0 };
  return dfsDeserialize(treeValues, idx);
}

function dfsDeserialize(treeValues: string[], idx: { val: number }): TreeNode | null {
  if (treeValues[idx.val] === 'null') {
    idx.val++;
    return null;
  }

  const newNode = new TreeNode(parseInt(treeValues[idx.val]));
  idx.val++;
  newNode.left = dfsDeserialize(treeValues, idx);
  newNode.right = dfsDeserialize(treeValues, idx);
  return newNode;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
