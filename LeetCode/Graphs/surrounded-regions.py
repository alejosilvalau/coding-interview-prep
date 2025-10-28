import collections
from typing import List


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        ROWS, COLS = len(board), len(board[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def bfs():
            queue = collections.deque()

            for row in range(ROWS):
                for col in range(COLS):
                    if (
                        row == 0 or row == ROWS - 1 or col == 0 or col == COLS - 1
                    ) and board[row][col] == "O":
                        queue.append((row, col))

            while queue:
                row, col = queue.popleft()
                if board[row][col] == "O":
                    board[row][col] = "T"
                    for dr, dc in directions:
                        r, c = row + dr, col + dc
                        if 0 <= r < ROWS and 0 <= c < COLS and board[r][c] == "O":
                            queue.append((r, c))

        bfs()
        for row in range(ROWS):
            for col in range(COLS):
                if board[row][col] == "O":
                    board[row][col] = "X"
                elif board[row][col] == "T":
                    board[row][col] = "O"
