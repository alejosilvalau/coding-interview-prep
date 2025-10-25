from collections import deque

# O(m * n) time | O(m * n) space
# m == number of rows in the grid
# n == number of columns in the grid
class Solution:

  def isLandAndTreasure(self, grid: List[int]) -> None:
    ROWS, COLS = len(grid), len(grid[0])
    visit = set()
    queue = deque()

    def addCell(row, col):
      if (min(row, col) < 0 or row == ROWS or col == COLS
          or (row, col) in visit or grid[row][col] == -1):
        return
      visit.add((row, col))
      queue.append([row, col])

    # Initialize the queue with all gates' positions
    for row in range(ROWS):
      for col in range(COLS):
        if grid[row][col] == 0:
          queue.append([row, col])
          visit.add((row, col))

    # Perform BFS from all gates simultaneously to find
    # the shortest distance to each empty room
    dist = 0
    while queue:
      for i in range(len(queue))
        row, col = queue.popleft()
        grid[row][col] = dist
        addCell(row + 1, col)
        addCell(row - 1, col)
        addCell(row, col - 1)
        addCell(row, col + 1)
      dist += 1

