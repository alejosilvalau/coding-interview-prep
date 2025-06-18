from collections import deque
import heapq
from typing import Counter, List

# O(m) time | O(1)
# m == number of unique tasks
#
# The time complexity comes from O(n * m), since n
# is a constant with a max value of 100, 
# we can consider the total time complexity as O(m).
#
# The space complexity is O(1) because we are using at most a
#  fixed-size array of size 26 (for the 26 lowercase English letters).
class Solution:
  def leastInterval(self, tasks: List[str], n: int) -> int:
    counter = Counter(tasks)
    maxHeap = [-count for count in counter.values()]
    heapq.heapify(maxHeap)

    currTime = 0
    # Declare a double queue, that will contain pairs of [-count, resumeTime]
    queue = deque()
    while maxHeap or queue:
      currTime += 1

      # If the maxHeap is empty, we need to wait for the next task
      if not maxHeap:
        currTime = queue[0][1]
      else:
        count = (-heapq.heappop(maxHeap)) - 1
        if count: 
          queue.append([-count, currTime + n])
      
      # If the current time matches the resume time of the task in the queue,
      # we can push it back to the maxHeap
      if queue and queue[0][1] == currTime:
        heapq.heappush(maxHeap, queue.popleft()[0])
    return currTime