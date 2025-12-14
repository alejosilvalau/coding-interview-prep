import collections
import heapq
from typing import List


# O(e * log(v)) time | O(v + e) space
# e == Number of edges
# v == Number of vertices
# It uses de Dijkstra's algorithm


# Mathematically speaking, we have e = v^2. As this
# Algorithm divides de graph on every loop, we would have
# e * log(v)^2 time. But as we drop the constant due
# to 2* e * log(v). Then we result on e * log(v) time.
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        edgesMap = collections.defaultdict(list)
        for start, target, weight in times:
            edgesMap[start].append((target, weight))

        minHeap = [(0, k)]
        # To avoid loops
        visit = set()

        totalTime = 0

        while minHeap:
            weight, node = heapq.heappop(minHeap)
            if node in visit:
                continue
            visit.add(node)

            totalTime = max(totalTime, weight)

            for neiNode, neiWeight in edgesMap[node]:
                if neiNode not in visit:
                    heapq.heappush(minHeap, (weight + neiWeight, neiNode))

        return totalTime if len(visit) == n else -1
