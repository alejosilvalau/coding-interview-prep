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

// O(n) time | // O(1) space
// n == length of the list
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Create a dummy node and add it to the beginning of the list
  const dummy = new ListNode(0);
  dummy.next = head;
  let left: ListNode | null = dummy;
  let right: ListNode | null = head;

  // Shift right n times
  while (n > 0) {
    right = right!.next;
    n -= 1;
  }

  // Move both pointers until the right pointer reaches the end of the list
  while (right) {
    left = left!.next;
    right = right.next;
  }

  // Remove the Nth node from the end
  left!.next = left?.next?.next ?? null;

  // Return the list without the dummy node
  return dummy.next;
}
