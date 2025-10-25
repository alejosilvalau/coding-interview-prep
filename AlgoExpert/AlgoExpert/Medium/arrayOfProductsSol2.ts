// O(n) time | O(n) space
// n is the length of the array

export function arrayOfProducts(array: number[]) {
	const products: number[] = new Array(array.length).fill(1);

	let leftRunningProduct = 1;
	for (let i = 0; i < array.length; i++) {
		products[i] = leftRunningProduct;
		leftRunningProduct *= array[i];
	}

	let rightRunningProduct = 1;
	for (let i = array.length - 1; i > -1; i--) {
		products[i] *= rightRunningProduct;
		rightRunningProduct *= array[i];
	}

	return products;
}
