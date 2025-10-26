from typing import List
from collections import deque


# O(m * n) time | O(m * n) space
# m == number of rows
# n == number of columns
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        queue = deque()
        freshOranges = 0
        timePassed = 0
        ROWS, COLS = len(grid), len(grid[0])

        for row in range(ROWS):
            for col in range(COLS):
                if grid[row][col] == 1:
                    freshOranges += 1
                if grid[row][col] == 2:
                    queue.append((row, col))

        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        while freshOranges > 0 and queue:
            length = len(queue)
            for idx in range(length):
                row, col = queue.popleft()

                for dRow, dCol in directions:
                    newRow, newCol = row + dRow, col + dCol
                    if (
                        newRow in range(ROWS)
                        and newCol in range(COLS)
                        and grid[newRow][newCol] == 1
                    ):
                        grid[newRow][newCol] = 2
                        queue.append((newRow, newCol))
                        freshOranges -= 1

            timePassed += 1
        return timePassed if freshOranges == 0 else -1
