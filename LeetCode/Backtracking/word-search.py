from typing import List

# O(m * 4^n) time | O(n) space
# m == number of cells in the board
# n == length of the word
class Solution:
  def exist(self, board: List[List[str]], word: str) -> bool:
    ROWS, COLS = len(board), len(board[0])
    board_copy = board.copy()

    def backtracking(row, col, idx):
      if idx == len(word):
        return True

      if (row < 0 or
          col < 0 or
          row >= ROWS or
          col >= COLS or
          word[idx] != board_copy[row][col] or
          board_copy[row][col] == '#'):
        return False

      # mark the cell as visited
      board_copy[row][col] = "#"
      
      # explore all possible directions: up, down, left, right
      response = (backtracking(row + 1, col, idx + 1) or
            backtracking(row - 1, col, idx + 1) or
            backtracking(row, col + 1, idx + 1) or
            backtracking(row, col - 1, idx + 1))
      
      # unmark the cell, restoring its original value
      board_copy[row][col] = word[idx]
      return response

    for row in range(ROWS):
      for col in range(COLS):
        if backtracking(row, col, 0):
          return True
    return False