namespace LeetCode.Tries.DesignAddAndSearchWordsDataStructure {
  class TrieNode {
    children: TrieNode[] | null[];
    word: boolean;
    constructor() {
      this.children = Array(26).fill(null);
      this.word = false;
    }
  }

  class WordDictionary {
    root: TrieNode;
    constructor() {
      this.root = new TrieNode();
    }

    getIndex(char: string) {
      return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    // O(n) time | O(t + n) space
    // n === length of the word
    // t === total number of nodes created in the Trie
    addWord(word: string): void {
      let currentNode = this.root;
      for (const character of word) {
        const idx = this.getIndex(character);
        if (currentNode.children[idx] === null) {
          currentNode.children[idx] = new TrieNode();
        }
        currentNode = currentNode.children[idx];
      }
      currentNode.word = true;
    }

    // O(n) time | O(t + n) space
    // n === length of the word
    // t === total number of nodes created in the Trie
    search(word: string): boolean {
      return this.depthFirstSearch(word, 0, this.root);
    }

    depthFirstSearch(word: string, j: number, root: TrieNode) {
      let currentNode = root;

      // Iterate through the characters of the word starting from index j
      for (let i = j; i < word.length; i++) {
        const currentChar = word[i];
        // If the current character is a dot, we need to use backtracking
        // to check all possible characters at this position
        if (currentChar === '.') {
          // If the current character is a dot, we need to check all possible children
          for (const child of currentNode.children) {
            // If there is a child node of the word length
            if (child !== null && this.depthFirstSearch(word, i + 1, child)) {
              // If any child returns true, we found a match
              return true;
            }
          }
          // If no child matches, return false
          return false;
        } else {
          // If the current character is not a dot, we check the specific child
          const idx = this.getIndex(currentChar);
          if (currentNode.children[idx] === null) {
            return false;
          }
          currentNode = currentNode.children[idx];
        }
      }
      // After processing all characters, check if we are at the end of a word
      return currentNode.word;
    }
  }

  /**
   * Your WordDictionary object will be instantiated and called as such:
   * var obj = new WordDictionary()
   * obj.addWord(word)
   * var param_2 = obj.search(word)
   */
}
