// O(n) time | O(n) space
// n = length of the array
//
// In the worst case scenario, the
// algorithm would take O(3n) time.
// This is when there isn't any greater element
// for the index that is being analyzed.
//
// As this is a circular array, it needs to be looped
// two times. Therefore, the average is O(2n). Thanks
// to Big O being an asymptotic calculation, then
// it results in O(n) time.
//
export function nextGreaterElement(array: number[]) {
	const result = new Array(array.length).fill(-1);
	const stack: number[] = [];

	for (let idx = 0; idx < 2 * array.length; idx++) {
		const circularIdx = idx % array.length;

		while (
			stack.length > 0 &&
			array[stack[stack.length - 1]] < array[circularIdx]
		) {
			const top = stack.pop()!;
			result[top] = array[circularIdx];
		}

		stack.push(circularIdx);
	}

	return result;
}
