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

// O(n*log(k)) time | O(k) space
// k == total number of lists
// n == total number of nodes across k lists
// This algorithm uses the divide and conquer approach
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || lists.length === 0) return null;

  // Iterate through the lists array until there is a single one
  while (lists.length > 1) {
    const mLists = [];

    // Iterate through each of the sublists log(k) times
    for (let i = 0; i < lists.length; i += 2) {
      const list1: ListNode | null = lists[i];
      const list2: ListNode | null = i + 1 >= lists.length ? null : lists[i + 1];
      mLists.push(mergeLists(list1, list2));
    }
    // Assign the merge lists from the current iteration
    lists = mLists;
  }

  // Return the head of the list
  return lists[0];
}

function mergeLists(list1: ListNode | null, list2: ListNode | null) {
  // Create dummyNode to avoud null exceptions
  const dummyNode = new ListNode(0);
  let currentNode = dummyNode;

  // Iterate through the lists from the input, adding the max value between the two pointers
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      currentNode.next = list1;
      list1 = list1.next;
    } else {
      currentNode.next = list2;
      list2 = list2.next;
    }
    currentNode = currentNode.next;
  }

  // Add to the tail of the return variable the remainder of the list that has nodes left
  currentNode.next = list1 ? list1 : list2;
  return dummyNode.next;
}
