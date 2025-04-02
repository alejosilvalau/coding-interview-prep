// O(1) time | O(1) space
//
// Even though the algorithm performs two nested loops (O(n^2)),
// the board is a fixed size of 9x9, so the time complexity is O(1).
//
// The space complexity is also O(1) because the set will never
// exceed 243 elements (9 rows * 9 columns * 3 strings per each box)
// in the worst case scenario.
function isValidSudoku(board: string[][]): boolean {
  const set = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell === '.') continue;
      const row = `row: ${i}, value: ${cell}`;
      const column = `column: ${j}, value: ${cell}`;
      const boxNumber = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const box = `boxNumber: ${boxNumber}, value: ${cell}`;
      if (set.has(row) || set.has(column) || set.has(box)) return false;
      set.add(row).add(column).add(box);
    }
  }
  return true;
}
