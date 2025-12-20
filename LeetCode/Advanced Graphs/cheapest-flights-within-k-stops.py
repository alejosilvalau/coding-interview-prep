import heapq
from collections import defaultdict
from typing import List


# O(E + n * k * log(n * k)) time | O(n * k) space
# E == Number of flights
# n == Number of cities
# k == Maximum allowed stops


# There are more efficient solutions, and better
# ones like the Bellman-Ford algorithm. This is my
# solution with the Dijkstra's algorithm
class Solution:
    def findCheapestPrice(
        self, n: int, flights: List[List[int]], src: int, dst: int, k: int
    ) -> int:
        graph = defaultdict(list)
        for u, v, w in flights:
            graph[u].append((v, w))

        # (cost, node, stops)
        heap = [(0, src, 0)]
        # best[node][stops] = min cost to reach node with stops
        best = {}

        while heap:
            cost, node, stops = heapq.heappop(heap)
            if node == dst:
                return cost
            if stops > k:
                continue
            for nei, price in graph[node]:
                next_cost = cost + price
                # Only push if this is the best cost for this node with stops
                if (nei, stops) not in best or next_cost < best[(nei, stops)]:
                    best[(nei, stops)] = next_cost
                    heapq.heappush(heap, (next_cost, nei, stops + 1))
        return -1


# Example step-by-step:
# Suppose n = 4, flights = [[0,1,100],[1,2,100],[2,3,100],[0,2,500]], src = 0, dst = 3, k = 1
# Graph:
# 0 -> 1 (100)
# 1 -> 2 (100)
# 2 -> 3 (100)
# 0 -> 2 (500)
#
# Goal: Cheapest price from 0 to 3 with at most 1 stop (i.e., up to 2 edges)
#
# Step 1: Start at node 0, cost 0, stops 0. Heap = [(0, 0, 0)]
# Step 2: Pop (0, 0, 0). From 0, can go to:
#         - 1 with cost 100 (push (100, 1, 1))
#         - 2 with cost 500 (push (500, 2, 1))
#         Heap = [(100, 1, 1), (500, 2, 1)]
# Step 3: Pop (100, 1, 1). From 1, can go to:
#         - 2 with cost 200 (100+100), stops=2 (push (200, 2, 2))
#         Heap = [(200, 2, 2), (500, 2, 1)]
# Step 4: Pop (200, 2, 2). From 2, can go to:
#         - 3 with cost 300 (200+100), stops=3 (but stops > k+1, so skip)
#         Heap = [(500, 2, 1)]
# Step 5: Pop (500, 2, 1). From 2, can go to:
#         - 3 with cost 600 (500+100), stops=2 (push (600, 3, 2))
#         Heap = [(600, 3, 2)]
# Step 6: Pop (600, 3, 2). Node == dst, return 600.
#
# So, answer is 600 (path: 0->2->3), since 0->1->2->3 requires 2 stops (3 edges), which exceeds k=1.
