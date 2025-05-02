// class ListNode {
//   val: number;
//   next: ListNode | null;
//   constructor(val?: number, next?: ListNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.next = next === undefined ? null : next;
//   }
// }

// O(n) time | O(1) space
// n == number of nodes in the linked list
function reorderList(head: ListNode | null): void {
  if (!head || !head.next || !head.next.next) return;

  // Find the middle of the linked list
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
  }

  // Reverse the second half of the list
  let second = slow.next;
  slow.next = null;
  let prev: ListNode | null = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  // Merge the two halves
  let first = head;
  second = prev;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;

    first.next = second;
    second.next = tmp1;

    first = tmp1!;
    second = tmp2;
  }
}
