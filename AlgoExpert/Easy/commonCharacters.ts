export function commonCharacters(strings: string[]) {
	const smallestString = getSmallestString(strings);
	const potentialCommonCharacters = new Set(smallestString);

	for (const string of strings) {
		removeNonExistentCharacters(string, potentialCommonCharacters);
	}

	return Array.from(potentialCommonCharacters);
}

function getSmallestString(strings: string[]) {
	let smallestString = strings[0];
	for (const string of strings) {
		if (string.length < smallestString.length) {
			smallestString = string;
		}
	}
	return smallestString;
}

function removeNonExistentCharacters(
	string: string,
	potentialCommonCharacters: Set<string>
) {
	const uniqueStringCharacters = new Set(string);

	for (const character of Array.from(potentialCommonCharacters)) {
		if (!uniqueStringCharacters.has(character)) {
			potentialCommonCharacters.delete(character);
		}
	}
}
