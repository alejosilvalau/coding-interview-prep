export class Node {
	value: number;
	next: Node | null;
	prev: Node | null;

	constructor(value: number) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

export class DoublyLinkedList {
	head: Node | null;
	tail: Node | null;

	constructor() {
		this.head = null;
		this.tail = null;
	}

	// O(1) time | O(1) space
	setHead(node: Node) {
		if (this.head === null) {
			this.head = node;
			this.tail = node;
			return;
		}
		this.insertBefore(this.head, node);
	}

	// O(1) time | O(1) space
	setTail(node: Node) {
		if (this.tail === null) {
			this.setHead(node);
			return;
		}
		this.insertAfter(this.tail, node);
	}

	// O(1) time | O(1) space
	insertBefore(node: Node, nodeToInsert: Node) {
		if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
		this.remove(nodeToInsert);
		nodeToInsert.prev = node.prev;
		nodeToInsert.next = node;
		if (node.prev === null) {
			this.head = nodeToInsert;
		} else {
			node.prev.next = nodeToInsert;
		}
		node.prev = nodeToInsert;
	}

	// O(1) time | O(1) space
	insertAfter(node: Node, nodeToInsert: Node) {
		if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
		this.remove(nodeToInsert);
		nodeToInsert.prev = node;
		nodeToInsert.next = node.next;
		if (node.next === null) {
			this.tail = nodeToInsert;
		} else {
			node.next.prev = nodeToInsert;
		}
		node.next = nodeToInsert;
	}

	// O(p) time | O(1) space, p = position
	insertAtPosition(position: number, nodeToInsert: Node) {
		if (position === 1) {
			this.setHead(nodeToInsert);
			return;
		}
		let node = this.head;
		let currentPosition = 1;
		while (node != null && currentPosition++ != position) node = node.next;
		if (node != null) {
			this.insertBefore(node, nodeToInsert);
		} else {
			this.setTail(nodeToInsert);
		}
	}

	// O(n) time | O(1) space
	removeNodesWithValue(value: number) {
		let node = this.head;
		while (node != null) {
			const nodeToRemove = node;
			node = node.next;
			if (nodeToRemove.value === value) this.remove(nodeToRemove);
		}
	}

	// O(1) time | O(1) space
	remove(node: Node) {
		if (node === this.head) this.head = this.head.next;
		if (node === this.tail) this.tail = this.tail.prev;
		this.removeNodeBindings(node);
	}

	// O(n) time | O(1) space
	containsNodeWithValue(value: number) {
		let node = this.head;
		while (node != null && node.value !== value) node = node.next;
		return node !== null;
	}

	removeNodeBindings(node: Node) {
		if (node.prev != null) node.prev.next = node.next;
		if (node.next != null) node.next.prev = node.prev;
		node.prev = null;
		node.next = null;
	}
}
