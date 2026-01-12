# O(n**2) time |  O(n) space
# n == length of the row or column of the matrix
from typing import List


class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        def scanOutside(minRange: int, maxRange: int) -> None:
            # Taking into consideration odd and even matrices
            if minRange >= maxRange:
                return

            # get the outer layer of the matrix
            top = matrix[minRange][minRange : maxRange + 1]
            bottom = matrix[maxRange][minRange : maxRange + 1]

            left, right = [], []
            for r in range(minRange, maxRange + 1):
                left.append(matrix[r][minRange])
                right.append(matrix[r][maxRange])

            # Replace the right side with top
            for r in range(len(top)):
                matrix[minRange + r][maxRange] = top[r]

            # Replace the bottom side with right
            for c in range(len(right)):
                matrix[maxRange][maxRange - c] = right[c]

            # Replace the left side with bottom
            for r in range(len(bottom)):
                matrix[minRange + r][minRange] = bottom[r]

            # Replace the top side with left
            for c in range(len(left)):
                matrix[minRange][maxRange - c] = left[c]

            # Recursive call
            scanOutside(minRange + 1, maxRange - 1)

        scanOutside(0, len(matrix) - 1)
