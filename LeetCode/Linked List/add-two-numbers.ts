// Time complexity: O(m + n)
// Space complexity: O(1) space and O(max(m,n)) for the output list
// m == length of the first linked list
// n == length of the second linked list
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Create a dummy node to avoid edge cases of adding to the head of the list
  let dummy = new ListNode(0);
  let currentNode = dummy;
  let carry = 0;

  // Iterate through through all the digits of both lists and the carry
  while (l1 || l2 || carry) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;

    // Add the values of the two nodes and the carry
    let sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    currentNode.next = new ListNode(sum % 10);
    currentNode = currentNode.next;

    // Move to the next nodes in the lists
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  // Return the next node of the dummy node, which is the head of the new list
  return dummy.next;
}
