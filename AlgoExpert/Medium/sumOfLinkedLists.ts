export class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

// O(max(n, m)) time | O(max(n, m)) space
// n = length of the first linked list
// m = length of the second linked list

export function sumOfLinkedLists(
	linkedListOne: LinkedList,
	linkedListTwo: LinkedList
) {
	const newLinkedListHeadPointer = new LinkedList(0);
	let currentNode = newLinkedListHeadPointer;
	let carry = 0;

	let nodeOne: LinkedList | null = linkedListOne;
	let nodeTwo: LinkedList | null = linkedListTwo;
	while (nodeOne !== null || nodeTwo !== null || carry !== 0) {
		const valueOne = nodeOne !== null ? nodeOne.value : 0;
		const valueTwo = nodeTwo !== null ? nodeTwo.value : 0;
		const sumOfValues = valueOne + valueTwo + carry;

		const newValue = sumOfValues % 10;
		const newNode = new LinkedList(newValue);
		currentNode.next = newNode;
		currentNode = newNode;

		carry = Math.floor(sumOfValues / 10);
		nodeOne = nodeOne !== null ? nodeOne.next : null;
		nodeTwo = nodeTwo !== null ? nodeTwo.next : null;
	}

	return newLinkedListHeadPointer.next;
}
