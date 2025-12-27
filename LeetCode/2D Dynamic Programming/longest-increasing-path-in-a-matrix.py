from typing import List


# O(m * n) time | O(m * n) space
# m = number of rows
# n = number of cols
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        memo = {}

        def dfs(r, c):
            if (r, c) in memo:
                return memo[(r, c)]
            max_len = 1
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < ROWS and 0 <= nc < COLS and matrix[nr][nc] > matrix[r][c]:
                    max_len = max(max_len, 1 + dfs(nr, nc))
            memo[(r, c)] = max_len
            return max_len

        result = 0
        for r in range(ROWS):
            for c in range(COLS):
                result = max(result, dfs(r, c))
        return result
