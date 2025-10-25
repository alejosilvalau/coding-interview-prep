// O(n^2) time | O(n) space
// n is the length of the array

export function arrayOfProducts(array: number[]) {
	const products: number[] = [];
	for (let i = 0; i < array.length; i++) {
		let runningProduct = 1;
		for (let j = 0; j < array.length; j++) {
			if (i !== j) {
				runningProduct *= array[j];
			}
			products[i] = runningProduct;
		}
	}
	return products;
}
