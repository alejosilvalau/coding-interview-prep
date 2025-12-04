import heapq
from typing import List

# O(n * log n) time | O(n) space
# n == number of stones
class Solution:
  def lastStoneWeight(self, stones: List[int]) -> int:
    # Create a max heap by negating the stone weights,
    # since Python's heapq implements a min heap by default.
    stonesMaxHeap = [-s for s in stones]
    heapq.heapify(stonesMaxHeap)

    while len(stonesMaxHeap) > 1:
      heaviest = -heapq.heappop(stonesMaxHeap)
      secondHeaviest = -heapq.heappop(stonesMaxHeap)

      # If the two heaviest stones are not equal, push the difference back into the heap
      if heaviest != secondHeaviest:
        heapq.heappush(stonesMaxHeap, -(heaviest - secondHeaviest))

    return -stonesMaxHeap[0] if stonesMaxHeap else 0