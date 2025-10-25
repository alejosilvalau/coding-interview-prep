export class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

// O(n + m) time | O(1) space
// n = length of the first Linked List
// m = length of the second Linked List
export function mergingLinkedLists(
	linkedListOne: LinkedList,
	linkedListTwo: LinkedList
) {
	let currentNodeOne: LinkedList | null = linkedListOne;
	let currentNodeTwo: LinkedList | null = linkedListTwo;

	while (currentNodeOne !== currentNodeTwo) {
		if (currentNodeOne === null) {
			currentNodeOne = linkedListTwo;
		} else {
			currentNodeOne = currentNodeOne.next;
		}

		if (currentNodeTwo === null) {
			currentNodeTwo = linkedListOne;
		} else {
			currentNodeTwo = currentNodeTwo.next;
		}
	}

	return currentNodeOne;
}
