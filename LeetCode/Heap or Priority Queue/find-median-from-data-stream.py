import heapq

class MedianFinder:
  def __init__(self):
    # The heaps should be of equal size or differ by one element.
    # The small is a max-heap (inverted min-heap) and the large is a min-heap.
    self.small, self.large = [], []
      
  # O(log n) time | O(n) space
  # n == number of elements added so far
  def addNum(self, num: int) -> None:
    # If the number is larger than the largest in the small heap, it goes to the large heap.
    if self.large and num > self.large[0]:
      heapq.heappush(self.large, num)
    else: 
      heapq.heappush(self.small, -num)

    # Balance the heaps if they differ in size by more than one.
    if len(self.small) > len(self.large) + 1:
      val = -heapq.heappop(self.small)
      heapq.heappush(self.large, val)

    if len(self.large) > len(self.small) + 1:
      val = heapq.heappop(self.large)
      heapq.heappush(self.small, -val)

  # O(1) time | O(n) space
  # n == number of elements added so far
  def findMedian(self) -> float:
    if len(self.small) > len(self.large):
      return -self.small[0]
    if len(self.large) > len(self.small):
      return self.large[0]
    return (-self.small[0] + self.large[0]) / 2.0
        


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()