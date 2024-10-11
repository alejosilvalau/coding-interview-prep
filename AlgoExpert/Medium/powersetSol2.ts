// O(n*2^n) time | O(n*2^n) space
// This is an iterative solution
export function powerset(array: number[]) {
	const subsets: number[][] = [[]];
	for (const ele of array) {
		const length = subsets.length;
		for (let i = 0; i < length; i++) {
			const currentSubset = subsets[i];
			subsets.push(currentSubset.concat(ele));
		}
	}
	return subsets;
}
