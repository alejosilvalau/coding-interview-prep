// The goal is to find the nodes at a
// distance k from the node with
// the target value.

// O(n) time | O(n) space

// The O(n) time comes from the assumption
// that a BFS algorithm takes O(v + e) time, with "v"
// being the nodes / vertices and "e" being the number of
// edges. As the number of edges is less than the number of
// nodes, then O(v + e) < O(2n) ~= O(n).

// O(n) space comes from the set or the parents
// dictionary structure used.
export class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

interface NodesToParent {
  [node: number]: BinaryTree | null;
}

export function findNodesDistanceK(tree: BinaryTree, target: number, k: number) {
  const nodesToParents: NodesToParent = {};
  populateNodesToParents(tree, nodesToParents);

  const targetNode = getNodeFromValue(target, tree, nodesToParents);
  return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

function populateNodesToParents(
  node: BinaryTree | null,
  nodesToParents: NodesToParent,
  parent: BinaryTree | null = null
) {
  if (node !== null) {
    nodesToParents[node.value] = parent;
    populateNodesToParents(node.left, nodesToParents, node);
    populateNodesToParents(node.right, nodesToParents, node);
  }
}

function getNodeFromValue(value: number, tree: BinaryTree, nodesToParents: NodesToParent) {
  if (tree.value === value) return tree;

  const nodeParent = nodesToParents[value]!;
  if (nodeParent.left !== null && nodeParent.left.value === value) return nodeParent.left;

  return nodeParent.right!;
}

function breadthFirstSearchForNodesDistanceK(targetNode: BinaryTree, nodesToParents: NodesToParent, k: number) {
  const queue: Array<[BinaryTree, number]> = [[targetNode, 0]];
  const seen = new Set([targetNode.value]);

  while (queue.length > 0) {
    const [currentNode, distanceFromTarget] = queue.shift()!;

    if (distanceFromTarget === k) {
      const nodesDistanceK = queue.map(pair => pair[0].value);
      nodesDistanceK.push(currentNode.value);
      return nodesDistanceK;
    }
    const connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]];
    for (const node of connectedNodes) {
      if (node === null) continue;

      if (seen.has(node.value)) continue;

      seen.add(node.value);
      queue.push([node, distanceFromTarget + 1]);
    }
  }
  return [];
}
