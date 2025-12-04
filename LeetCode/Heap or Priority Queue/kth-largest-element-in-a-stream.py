import heapq
from typing import List

# O(m * log k) time | O(k) space
# m == number of add operations
# k == size of the heap
class KthLargest:

  def __init__(self, k: int, nums: List[int]):
    self.min_heap, self.k = nums, k
    
    # Initialize the min heap with the first k elements
    heapq.heapify(self.min_heap)
    
    # If there are more than k elements, remove the smallest ones
    while len(self.min_heap) > k:
      heapq.heappop(self.min_heap)


  def add(self, val: int) -> int:
    heapq.heappush(self.min_heap, val)
    
    # If the size of the heap exceeds k, remove the smallest element
    if len(self.min_heap) > self.k:
      heapq.heappop(self.min_heap)
    
    return self.min_heap[0]


# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)