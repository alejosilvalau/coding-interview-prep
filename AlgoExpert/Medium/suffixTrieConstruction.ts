interface TrieNode {
  [key: string]: TrieNode | boolean;
}

export class SuffixTrie {
  root: TrieNode;
  endSymbol: string;

  constructor(string: string) {
    this.root = {};
    this.endSymbol = "*";
    this.populateSuffixTrieFrom(string);
  }

  // O(n^2) time | O(n^2) space
  // n == length of the string
  populateSuffixTrieFrom(string: string) {
    for (let i = 0; i < string.length; i++) {
      this.insertSubstringStartingAt(i, string);
    }
  }

  insertSubstringStartingAt(i: number, string: string) {
    let node = this.root;
    for (let j = i; j < string.length; j++) {
      const letter = string[j];
      if (!(letter in node)) node[letter] = {};
      node = node[letter] as TrieNode;
    }
    node[this.endSymbol] = true;
  }

  // O(m) time | O(1) space
  // m == length of the string that we are looking for
  contains(string: string) {
    let node = this.root;
    for (const letter of string) {
      if (!(letter in node)) return false;
      node = node[letter] as TrieNode;
    }
    return this.endSymbol in node;
  }
}
