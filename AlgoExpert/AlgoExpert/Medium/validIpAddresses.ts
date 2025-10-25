// O(1) time | O(1) space
// The size of the input would be at most 12 digits.
// This means that it doesn't grow with the input array,
// resulting in O(12) == O(1).
//
// This is also why, it has O(1) space. At most
// 2^32 IP addresses can be generated because we can
// generate 4 numbers from 0 - 255.
//
// This means that for each of the parts of the IP Address,
// there are 256 possibilities. Then 256 * 4 == 2^32.
//
// That's why the space and time complexity are constants.
// Because there are a constant / finite amount of
// operations that can be made.
export function validIPAddresses(string: string) {
	const ipAddressesFound: string[] = [];

	for (let i = 0; i < Math.min(string.length, 4); i++) {
		const currentIPAddressParts = ["", "", "", ""];

		currentIPAddressParts[0] = string.slice(0, i);
		if (!isValidPart(currentIPAddressParts[0])) continue;

		for (let j = i + 1; j < i + Math.min(string.length - i, 4); j++) {
			currentIPAddressParts[1] = string.slice(i, j);
			if (!isValidPart(currentIPAddressParts[1])) continue;

			for (let k = j + 1; k < j + Math.min(string.length - j, 4); k++) {
				currentIPAddressParts[2] = string.slice(j, k);
				currentIPAddressParts[3] = string.slice(k);

				if (
					isValidPart(currentIPAddressParts[2]) &&
					isValidPart(currentIPAddressParts[3])
				) {
					ipAddressesFound.push(currentIPAddressParts.join("."));
				}
			}
		}
	}
	return ipAddressesFound;
}

function isValidPart(string: string) {
	const stringAsInt = parseInt(string);
	if (stringAsInt > 255) return false;

	return string.length === stringAsInt.toString().length;
}
