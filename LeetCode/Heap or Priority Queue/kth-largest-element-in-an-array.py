from heapq import heappop, heappush
from typing import List

# O(k log n) time | O(k) space
# n == length of nums
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []
        for num in nums:
            heappush(min_heap, num)
            if len(min_heap) > k:
                heappop(min_heap)
        return min_heap[0]