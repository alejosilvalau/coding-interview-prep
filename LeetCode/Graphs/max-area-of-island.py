 
from typing import List

# O(r * c) time | O(r * c) space
# r == number of rows in the grid
# c == number of columns in the grid
class Solution:
  def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
    ROWS, COLS = len(grid), len(grid[0])
    directions = [(1,0), (-1,0), (0,1), (0,-1)]
    visited = set()
    maxArea = 0

    def depthFirstSearch(row, col):
      if (
        row < 0 or row == ROWS or 
        col < 0 or col == COLS or 
        grid[row][col] == 0 or 
        (row, col) in visited
      ):
        return 0

      visited.add((row, col))
      currArea = 1
      for dr, dc in directions:
        currArea += depthFirstSearch(row + dr, col + dc)
      return currArea


    for r in range(ROWS):
      for c in range(COLS):
        maxArea = max(maxArea, depthFirstSearch(r, c))

    return maxArea