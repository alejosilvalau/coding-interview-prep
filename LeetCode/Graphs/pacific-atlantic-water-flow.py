from typing import List


# O(N * M) time | O(N * M) space
# N is number of rows, M is number of columns
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(heights), len(heights[0])
        pac_set, atl_set = set(), set()

        def dfs(row, col, visit_set, prev_height):
            if (
                (row, col) in visit_set
                or row < 0
                or col < 0
                or row == ROWS
                or col == COLS
                or heights[row][col] < prev_height
            ):
                return

            visit_set.add((row, col))

            directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            for dr, dc in directions:
                dfs(row + dr, col + dc, visit_set, heights[row][col])

        for col in range(COLS):
            dfs(0, col, pac_set, heights[0][col])
            dfs(ROWS - 1, col, atl_set, heights[ROWS - 1][col])

        for row in range(ROWS):
            dfs(row, 0, pac_set, heights[row][0])
            dfs(row, COLS - 1, atl_set, heights[row][COLS - 1])

        result = []
        for row in range(ROWS):
            for col in range(COLS):
                if (row, col) in pac_set and (row, col) in atl_set:
                    result.append([row, col])
        return result
