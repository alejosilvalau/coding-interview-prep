// This problem is solved with the SubSets approach.

export class UnionFind {
	parents: Record<number, number>;

	constructor() {
		this.parents = {};
	}

	// O(1) time | O(1) space
	createSet(value: number) {
		this.parents[value] = value;
	}

	// O(n) time | O(1) space - where n is the total number of values
	find(value: number) {
		if (!(value in this.parents)) return null;

		let currentParent = value;
		while (currentParent !== this.parents[currentParent]) {
			currentParent = this.parents[currentParent];
		}
		return currentParent;
	}

	// O(n) time | O(1) space - where n is the total number of values
	union(valueOne: number, valueTwo: number) {
		if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

		const valueOneRoot = this.find(valueOne)!;
		const valueTwoRoot = this.find(valueTwo)!;
		this.parents[valueTwoRoot] = valueOneRoot;
	}
}
