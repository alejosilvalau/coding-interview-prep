// This is an input class. Do not edit.
export class LinkedList {
	value: number;
	next: LinkedList | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
	}
}

export function middleNode(linkedList: LinkedList) {
	let slowNode = linkedList;
	let fastNode: LinkedList | null = linkedList;
	while (fastNode != null && fastNode.next != null) {
		slowNode = slowNode.next!;
		fastNode = fastNode.next.next;
	}

	return slowNode;
}
