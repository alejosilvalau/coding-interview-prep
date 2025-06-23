import collections
from typing import List

# O(n * m) time | O(n * m) space
# n == number of rows in the grid
# m == number of columns in the grid
class Solution: 
  def numIslands(self, grid: List[List[str]]) -> int: 
    if not grid:
      return 0

    directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    ROWS, COLS = len(grid), len(grid[0])
    visited = set()
    numIslands = 0

    def breadthFirstSearch(r, c):
      queue = collections.deque()
      visited.add((r, c))
      queue.append((r, c))

      while queue:
        row, col = queue.popleft()
        for dr, dc in directions:
          nr, nc = row + dr, col + dc
          if (nr in range(ROWS) and nc in range(COLS) and grid[nr][nc] == "1" and (nr, nc) not in visited):
            queue.append((nr, nc))
            visited.add((nr, nc))

    for r in range(ROWS):
      for c in range(COLS):
        if grid[r][c] == "1" and (r, c) not in visited:
          breadthFirstSearch(r, c)
          numIslands += 1

    return numIslands