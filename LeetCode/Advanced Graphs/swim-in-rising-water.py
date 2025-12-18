import heapq
from typing import List

# O(n^2 * log(n)) time | O(n^2) space
# n == length of the column or the row

# The time complexity comes from the visit set


# The space complexity comes from visiting each
# cell on the matrix, and performing a minHeap
# operation on each of them.
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        N = len(grid)
        visit = set()
        minHeap = [(grid[0][0], 0, 0)]  # (time, row, col)
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        visit.add((0, 0))
        while minHeap:
            time, row, col = heapq.heappop(minHeap)
            if row == N - 1 and col == N - 1:
                return time  # This is the bottom right of the matrix

            for dRow, dCol in directions:
                nRow, nCol = row + dRow, col + dCol

                if (
                    nRow < 0
                    or nCol < 0
                    or nRow == N
                    or nCol == N
                    or (nRow, nCol) in visit
                ):
                    continue
                visit.add((nRow, nCol))

                heapq.heappush(minHeap, (max(time, grid[nRow][nCol]), nRow, nCol))


"""
My own solution:
import collections
import heapq
from typing import List


class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        C = len(grid[0])
        R = len(grid)

        edgesMap = collections.defaultdict(list)
        for r in range(R):
            for c in range(C):
                if r + 1 < R:
                    edgesMap[(r, c)].append((r + 1, c))
                if r - 1 >= 0:
                    edgesMap[(r, c)].append((r - 1, c))
                if c + 1 < C:
                    edgesMap[(r, c)].append((r, c + 1))
                if c - 1 >= 0:
                    edgesMap[(r, c)].append((r, c - 1))

        minHeap = [(grid[0][0], 0, 0)]

        visit = set()

        totalTime = 0

        while minHeap:
            elevation, row, col = heapq.heappop(minHeap)
            if (row, col) in visit:
                continue
            visit.add((row, col))

            totalTime = max(totalTime, elevation)

            if row == R - 1 and col == C - 1:
                return totalTime

            for neiRow, neiCol in edgesMap[(row, col)]:
                if (neiRow, neiCol) not in visit:
                    heapq.heappush(minHeap, (grid[neiRow][neiCol], neiRow, neiCol))

        return totalTime
"""
