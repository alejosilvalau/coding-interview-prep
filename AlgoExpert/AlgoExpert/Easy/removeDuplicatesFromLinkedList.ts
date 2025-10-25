// This is an input class. Do not edit.
export class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

export function removeDuplicatesFromLinkedList(linkedList: LinkedList) {
	let currentNode: LinkedList | null = linkedList;
	while (currentNode !== null) {
		let nextDistinctNode: LinkedList | null = currentNode.next;
		while (
			nextDistinctNode !== null &&
			nextDistinctNode.value === currentNode.value
		) {
			nextDistinctNode = nextDistinctNode.next;
		}

		currentNode.next = nextDistinctNode;
		currentNode = nextDistinctNode;
	}

	return linkedList;
}
