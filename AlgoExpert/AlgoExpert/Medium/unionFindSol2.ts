// This problem is solved with the SubSets approach.
// In this solution, the tree maintains itself balanced

export class UnionFind {
	parents: Record<number, number>;
	ranks: Record<number, number>;

	constructor() {
		this.parents = {};
		this.ranks = {};
	}

	// O(1) time | O(1) space
	createSet(value: number) {
		this.parents[value] = value;
		this.ranks[value] = 0;
	}

	// O(log(n)) time | O(1) space - where n is the total number of values
	find(value: number) {
		if (!(value in this.parents)) return null;

		let currentParent = value;
		while (currentParent !== this.parents[currentParent]) {
			currentParent = this.parents[currentParent];
		}
		return currentParent;
	}

	// O(log(n)) time | O(1) space - where n is the total number of values
	union(valueOne: number, valueTwo: number) {
		if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

		const valueOneRoot = this.find(valueOne)!;
		const valueTwoRoot = this.find(valueTwo)!;
		if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
			this.parents[valueOneRoot] = valueTwoRoot;
		} else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
			this.parents[valueTwoRoot] = valueOneRoot;
		} else {
			this.parents[valueTwoRoot] = valueOneRoot;
			this.ranks[valueOneRoot] += 1;
		}
	}
}
