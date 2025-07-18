from collections import defaultdict
import heapq
from typing import List

# O(n log n) time for getNewsFeed and O(1) time for the rest
# O(N * m + N * M + n) space
# 
# n == number of followeeeIds associated with the userId
# m == max number of tweets posted by a user
# M == max number of followees for any user
# N == total number of userIds
class Twitter:
  def __init__(self):
    self.time = 0

    # userId -> list of [time, tweetIds]
    self.tweetMap = defaultdict(list)

    # userId -> set of followeeId
    self.followingMap = defaultdict(set)

  def postTweet(self, userId: int, tweetId: int) -> None:
    self.tweetMap[userId].append([self.time, tweetId])
    # Ass python doesn't have a maxHeap implementation
    # we need to substract 1 to the time to maintain the order
    self.time -= 1

  def getNewsFeed(self, userId: int) -> List[int]:
    response = []
    maxHeap = []

    self.followingMap[userId].add(userId)
    for followeeId in self.followingMap[userId]:
      if followeeId in self.tweetMap:
        idx = len(self.tweetMap[followeeId]) - 1
        time, tweetId = self.tweetMap[followeeId][idx]
        heapq.heappush(maxHeap, [time, tweetId, followeeId, idx - 1]) 

    while maxHeap and len(response) < 10:
      time, tweetId, followeeId, idx = heapq.heappop(maxHeap)
      response.append(tweetId)
      if idx >= 0:
        time, tweetId = self.tweetMap[followeeId][idx]
        heapq.heappush(maxHeap, [time, tweetId, followeeId, idx - 1])
    return response

  def follow(self, followerId: int, followeeId: int) -> None:
    self.followingMap[followerId].add(followeeId)

  def unfollow(self, followerId: int, followeeId: int) -> None:
    if followeeId in self.followingMap[followerId]:
      self.followingMap[followerId].remove(followeeId)


# Your Twitter object will be instantiated and called as such:
# obj = Twitter()
# obj.postTweet(userId,tweetId)
# param_2 = obj.getNewsFeed(userId)
# obj.follow(followerId,followeeId)
# obj.unfollow(followerId,followeeId)
