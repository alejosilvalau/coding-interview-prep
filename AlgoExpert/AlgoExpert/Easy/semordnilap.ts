export function semordnilap(words: string[]) {
	const wordSet = new Set(words);
	const semordnilapPairs: [string, string][] = [];

	for (const word of words) {
		const reverse = word.split("").reverse().join("");
		if (wordSet.has(reverse) && reverse !== word) {
			semordnilapPairs.push([word, reverse]);
			wordSet.delete(word);
			wordSet.delete(reverse);
		}
	}

	return semordnilapPairs;
}
