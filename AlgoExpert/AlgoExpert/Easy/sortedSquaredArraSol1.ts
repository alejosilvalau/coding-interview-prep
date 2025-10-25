export function sortedSquaredArray(array: number[]) {
	let retArr: number[] = [];
	let leftIdx = 0,
		rightIdx = array.length - 1;
	while (leftIdx <= rightIdx) {
		if (Math.abs(array[leftIdx]) > Math.abs(array[rightIdx])) {
			retArr.unshift(array[leftIdx] * array[leftIdx]);
			leftIdx++;
		} else {
			retArr.unshift(array[rightIdx] * array[rightIdx]);
			rightIdx--;
		}
	}
	return retArr;
}
