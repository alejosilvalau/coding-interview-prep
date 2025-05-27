// O(n) time on each function call | O(t) space
// n === length of the string
// t === total number of nodes created in the Trie
class Trie {
  children: Map<string, Trie>;
  endOfWord: boolean;
  constructor() {
    this.children = new Map();
    this.endOfWord = false;
  }

  /**
   * Inserts a word into the trie.
   * @param word The word to insert.
   */
  insert(word: string): void {
    let current: Trie = this;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new Trie());
      }
      current = current.children.get(char)!;
    }
    current.endOfWord = true;
  }

  /**
   * Searches for a word in the trie.
   * @param word The word to search for.
   * @returns True if the word is found, false otherwise.
   */
  search(word: string): boolean {
    let current: Trie = this;
    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    return current.endOfWord;
  }

  /**
   * Checks if there is any word in the trie that starts with the given prefix.
   * @param prefix The prefix to check.
   * @returns True if any word starts with the prefix, false otherwise.
   */
  startsWith(prefix: string): boolean {
    let current: Trie = this;
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
