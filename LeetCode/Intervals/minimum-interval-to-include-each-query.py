import heapq
from typing import List


# O(n log n + m log m) time | O(n + m) space
# n = number of intervals
# m = number of queries


# The min heap is necessary because multiple intervals can include the same query,
# and we need to efficiently get the smallest one.
class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        intervals.sort()

        minHeap = []
        res, i = {}, 0
        for q in sorted(queries):
            while i < len(intervals) and intervals[i][0] <= q:
                l, r = intervals[i]
                if r >= q:
                    # The interval includes the query
                    heapq.heappush(minHeap, (r - l + 1, r))
                i += 1

            while minHeap and minHeap[0][1] < q:
                # Remove intervals that do not include the query
                heapq.heappop(minHeap)
            res[q] = minHeap[0][0] if minHeap else -1

        return [res[q] for q in queries]
