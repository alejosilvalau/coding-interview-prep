# Time complexity: O(m*n)
# Space complexity:
#   O(min(n, m)) for the algorithm due to the recursion stack
#   O(m*n) for the res array
from typing import List


class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []

        def scanOutside(
            minVertical: int, maxVertical: int, minHorizontal: int, maxHorizontal: int
        ) -> None:
            # Taking into consideration odd and even matrices
            if minVertical > maxVertical or minHorizontal > maxHorizontal:
                return

            # Single row remaining
            if minVertical == maxVertical:
                for c in range(minHorizontal, maxHorizontal + 1):
                    res.append(matrix[minVertical][c])
                return

            # Single column remaining
            if minHorizontal == maxHorizontal:
                for r in range(minVertical, maxVertical + 1):
                    res.append(matrix[r][minHorizontal])
                return

            # Append top without the last element
            for c in range(minHorizontal, maxHorizontal):
                res.append(matrix[minVertical][c])

            # Append left without the last element
            for r in range(minVertical, maxVertical):
                res.append(matrix[r][maxHorizontal])

            # Append bottom without the last element
            for c in range(maxHorizontal, minHorizontal, -1):
                res.append(matrix[maxVertical][c])

            # Append right without the last element
            for r in range(maxVertical, minVertical, -1):
                res.append(matrix[r][minHorizontal])

            # Recursive call
            scanOutside(
                minVertical + 1, maxVertical - 1, minHorizontal + 1, maxHorizontal - 1
            )

        scanOutside(0, len(matrix) - 1, 0, len(matrix[0]) - 1)
        return res
