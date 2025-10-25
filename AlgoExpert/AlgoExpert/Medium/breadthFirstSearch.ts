export class Node {
	name: string;
	children: Node[];

	constructor(name: string) {
		this.name = name;
		this.children = [];
	}

	addChild(name: string): Node {
		this.children.push(new Node(name));
		return this;
	}

	// O(v + e) time | O(v) space
	// v = number of vertices
	// e = number of edges
	//
	// O(v + e) time comes from traversing through v elements,
	// and adding e elements on the queue at each iteration
	//
	// O(v) comes from the worst case scenario, in which all the nodes are
	// children's of the first node. In that case, the queue would have v
	// elements at some point.
	// Plus, comes from the length of the return array.

	breadthFirstSearch(array: string[]) {
		const queue: Node[] = [this];
		while (queue.length > 0) {
			const current = queue.shift()!;
			array.push(current.name);
			for (const child of current.children) {
				queue.push(child);
			}
		}
		return array;
	}
}
