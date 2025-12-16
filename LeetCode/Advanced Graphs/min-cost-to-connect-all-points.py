import heapq
from typing import List


# O(n^2 * log(n)) time | O(n^2) space
# n == length of the points array
# Prim's algorithm

# n^2 comes from adding the same
# node multiple times for every
# possible edge on the graph


# log(n) comes from the popping of
# the minHeap.
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        N = len(points)

        adjList = {
            i: [] for i in range(N)
        }  # Hashmap with a list of adjacent nodes inside

        # Build the adjacency list
        for i in range(N):
            x1, y1 = points[i]
            for j in range(i + 1, N):
                x2, y2 = points[j]
                cost = abs(x1 - x2) + abs(y1 - y2)  # Manhattan distance
                adjList[i].append([cost, j])
                adjList[j].append([cost, i])

        # Prim's algorithm
        res = 0
        visit = set()
        minHeap = [[0, 0]]  # Starts at [0,0], can start at any point
        while len(visit) < N:  # Avoids visiting a node twice
            cost, i = heapq.heappop(minHeap)
            if i not in visit:
                res += cost
                visit.add(i)
                for nCost, n in adjList[i]:
                    if n not in visit:
                        heapq.heappush(minHeap, [nCost, n])

        return res


"""
# Example:
# Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
# Output: 20
# Explanation:
# The algorithm connects all points with the minimum total cost using Prim's algorithm.
#
# Step-by-step:
#
# Initial state:
#   minHeap = [[0, 0]]
#   visit = set()
#   res = 0
#
# 1. Pop [0, 0] from minHeap:
#    - visit = {0}
#    - res = 0
#    - Add all neighbors of 0 to minHeap:
#      [4, 1], [13, 2], [7, 3], [7, 4]
#    - minHeap = [[4, 1], [13, 2], [7, 3], [7, 4]]
#
# 2. Pop [4, 1] from minHeap:
#    - visit = {0, 1}
#    - res = 4
#    - Add all neighbors of 1 not in visit:
#      [4, 0] (already visited), [9, 2], [3, 3], [7, 4]
#    - minHeap = [[3, 3], [7, 3], [7, 4], [13, 2], [9, 2], [7, 4]]
#
# 3. Pop [3, 3] from minHeap:
#    - visit = {0, 1, 3}
#    - res = 7
#    - Add all neighbors of 3 not in visit:
#      [7, 0] (already visited), [3, 1] (already visited), [10, 2], [4, 4]
#    - minHeap = [[4, 4], [7, 3], [7, 4], [13, 2], [9, 2], [7, 4], [10, 2]]
#
# 4. Pop [4, 4] from minHeap:
#    - visit = {0, 1, 3, 4}
#    - res = 11
#    - Add all neighbors of 4 not in visit:
#      [7, 0] (already visited), [7, 1] (already visited), [14, 2], [4, 3] (already visited)
#    - minHeap = [[7, 3], [7, 4], [10, 2], [13, 2], [9, 2], [7, 4], [14, 2]]
#
# 5. Pop [7, 3] or [7, 4] (already visited), skip.
#    - Continue popping until you get an unvisited node.
#
# 6. Pop [9, 2] from minHeap:
#    - visit = {0, 1, 2, 3, 4}
#    - res = 20
#    - All points are now connected.
#
# Final state:
#   visit = {0, 1, 2, 3, 4}
#   res = 20
"""
