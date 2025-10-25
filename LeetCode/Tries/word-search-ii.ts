namespace LeetCode.Tries.WordSearchII {
  class TrieNode {
    children: { [key: string]: TrieNode };
    isWord: boolean;

    constructor() {
      this.children = {};
      this.isWord = false;
    }

    addWord(word: string): void {
      let currentNode: TrieNode = this;
      for (const char of word) {
        if (!(char in currentNode.children)) {
          currentNode.children[char] = new TrieNode();
        }
        currentNode = currentNode.children[char];
      }
      currentNode.isWord = true;
    }
  }

  // It gives TLE, but the logic is correct.
  // It needs to prune the words from the trie after having found them.
  function findWords(board: string[][], words: string[]): string[] {
    const trieRoot = new TrieNode();

    // Insert all words into the trie
    for (const word of words) {
      trieRoot.addWord(word);
    }

    // Get the dimensions of the board and initialize variables
    const ROWS: number = board.length;
    const COLS: number = board[0].length;
    const foundWords: Set<string> = new Set();
    const visitedCells: Set<string> = new Set();

    // Depth-first search function to explore the board
    const dfs = (row: number, col: number, currentNode: TrieNode, currentWord: string): void => {
      // Check if the current position is out of bounds, already visited, or not in the trie
      if (
        row < 0 ||
        col < 0 ||
        row >= ROWS ||
        col >= COLS ||
        visitedCells.has(`${row},${col}`) ||
        !(board[row][col] in currentNode.children)
      ) {
        return;
      }

      // Mark the current cell as visited and update the current word
      visitedCells.add(`${row},${col}`);
      const char: string = board[row][col];
      currentNode = currentNode.children[char];
      currentWord += char;

      // If the current node is a word, add it to the found words set
      if (currentNode.isWord) {
        foundWords.add(currentWord);
      }

      // Explore all four directions (up, down, left, right)
      dfs(row + 1, col, currentNode, currentWord);
      dfs(row - 1, col, currentNode, currentWord);
      dfs(row, col + 1, currentNode, currentWord);
      dfs(row, col - 1, currentNode, currentWord);

      // Backtrack: unmark the current cell as visited.
      // This allows other paths to use this cell.
      visitedCells.delete(`${row},${col}`);
    };

    // Start DFS from each cell in the board
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        dfs(row, col, trieRoot, '');
      }
    }

    // Convert the set of found words to an array and return it
    return Array.from(foundWords);
  }
}
