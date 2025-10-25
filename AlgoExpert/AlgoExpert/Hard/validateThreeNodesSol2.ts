export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(d) time | O(1) space
// h == distance between nodeOne and nodeThree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  let searchOne: BST | null = nodeOne;
  let searchTwo: BST | null = nodeThree;

  while (true) {
    const foundThreeFromOne = searchOne === nodeThree;
    const foundOneFromThree = searchTwo === nodeOne;
    const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    const finishedSearching = searchOne === null && searchTwo === null;
    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
      break;
    }

    if (searchOne !== null) {
      searchOne = searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    if (searchTwo !== null) {
      searchTwo = searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }

  const foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
  if (!foundNodeTwo || foundNodeFromOther) return false;

  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

function searchForTarget(node: BST, target: BST) {
  let currentNode: BST | null = node;
  while (currentNode !== null && currentNode !== target) {
    currentNode = target.value < currentNode.value ? currentNode.left : currentNode.right;
  }

  return currentNode === target;
}
