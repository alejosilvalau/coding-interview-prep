import heapq
from typing import List


# O(k * log n) time | O(n) space
# n == number of points
# k == number of closest points to return
class Solution:
  def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
    minHeap = []
    for x, y in points: 
      # Calculate the distance by summing both axis to the power of two.
      # Calculating the value of the square root is not relevant here since we just 
      # need to compare values, and not returning them
      distance = (x**2) + (y**2)
      minHeap.append([distance, x, y])

    heapq.heapify(minHeap)
    result = []
    while k > 0:
      distance, x, y = heapq.heappop(minHeap)
      result.append([x, y]) 
      k -= 1

    return result