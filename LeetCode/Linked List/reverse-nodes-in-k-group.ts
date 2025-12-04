/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// O(n) time | O(1) space
// n == length of the linked list
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // Add a dummy node to have a pointer reference outside the group
  const dummyNode = new ListNode(0, head);
  let groupPrevNode: ListNode | null = dummyNode;

  // Check if there are at least k nodes left in the list
  while (true) {
    const kthNode: ListNode | null = getKthNode(groupPrevNode, k);
    if (!kthNode) break;

    const groupNext: ListNode | null = kthNode.next;

    reverseGroup(groupPrevNode!.next, groupNext);

    // Connect the previous group with the current group
    const tmp: ListNode | null = groupPrevNode!.next;
    groupPrevNode!.next = kthNode;
    groupPrevNode = tmp;
  }

  return dummyNode.next;
}

function getKthNode(currNode: ListNode | null, k: number): ListNode | null {
  while (currNode && k > 0) {
    currNode = currNode.next;
    k--;
  }
  return currNode;
}

function reverseGroup(startNode: ListNode | null, endNode: ListNode | null): void {
  let prevNode: ListNode | null = endNode;
  let currNode: ListNode | null = startNode;
  while (currNode != endNode) {
    const tmpNode: ListNode | null = currNode!.next;
    currNode!.next = prevNode;
    prevNode = currNode;
    currNode = tmpNode;
  }
}
