// O(w * n * log(n)) time | O(wn) space
// w is the number of words,
// n is the length of the longest word.

// The algorithm iterates through w words,
// sorts each word in nlog(n) time.

// The space complexity is O(wn) because we are
// storing w words in an hash table of n
// groups of anagrams.

export function groupAnagrams(words: string[]) {
  const anagrams: { [key: string]: string[] } = {};
  for (const word of words) {
    const sortedWord = word.split("").sort().join("");
    if (sortedWord in anagrams) {
      anagrams[sortedWord].push(word);
    } else {
      anagrams[sortedWord] = [word];
    }
  }
  return Object.values(anagrams);
}
