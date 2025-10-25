class _Node {
  val: number;
  next: _Node | null;
  random: _Node | null;

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

// O(n) time | O(n) space
// n == length of the linked list
// It uses the two pass technique
function copyRandomList(head: _Node | null): _Node | null {
  // Create a hashmap, and set the case for null
  const oldToCopy = new Map();
  oldToCopy.set(null, null);

  // Fill out the map with the values from the original list
  let currentNode = head;
  while (currentNode) {
    const copyNode = new _Node(currentNode.val);
    oldToCopy.set(currentNode, copyNode);
    currentNode = currentNode.next;
  }

  // A second pass to assign the random pointers on each node
  currentNode = head;
  while (currentNode) {
    const copyNode = oldToCopy.get(currentNode);
    copyNode.next = oldToCopy.get(currentNode.next);
    copyNode.random = oldToCopy.get(currentNode.random);
    currentNode = currentNode.next;
  }

  // Return the head of the new list
  return oldToCopy.get(head);
}
