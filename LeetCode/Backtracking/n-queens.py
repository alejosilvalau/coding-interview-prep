from typing import List

# O(n!) time | O(n^2) space
# n == size of the board
class Solution:
  def solveNQueens(self, n: int) -> List[List[str]]:
    columns = set()
    positiveDiagonals = set()
    negativeDiagonals = set()

    results = []
    # Initialize the board with empty strings
    board = [["."] * n for _ in range(n)]

    def backtrack(row):
      # If we have placed queens in all rows, add the board to results
      if row == n:
        copy = ["".join(r) for r in board]
        results.append(copy)
        return

      # Try placing a queen in each column of the current row,

      for col in range(n):
        if (col in columns or 
            (row + col) in positiveDiagonals or 
            (row - col) in negativeDiagonals):
          continue

        # Place the queen
        columns.add(col)
        positiveDiagonals.add(row + col)
        negativeDiagonals.add(row - col)
        board[row][col] = "Q"

        # Recur to place queens in the next row
        backtrack(row + 1)

        # Remove the queen and backtrack
        columns.remove(col)
        positiveDiagonals.remove(row + col)
        negativeDiagonals.remove(row - col)
        board[row][col] = "."

    backtrack(0)
    return results
