type SpecialArray = Array<number | SpecialArray>;

// Tip: You can use the Array.isArray function to check whether an item
// is a list or an integer.
export function productSum(array: SpecialArray, multiplier = 1) {
	let sum = 0;
	for (const element of array) {
		if (Array.isArray(element)) {
			sum += productSum(element, multiplier + 1);
		} else {
			sum += element;
		}
	}
	return sum * multiplier;
}
