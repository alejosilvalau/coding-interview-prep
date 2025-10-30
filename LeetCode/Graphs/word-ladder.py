from typing import List
import collections


# O(m^2 * n) time | O(m^2 * n) space
# n = number of words
# m = length of the words
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0

        n = collections.defaultdict(list)
        wordList.append(beginWord)
        for w in wordList:
            for j in range(len(w)):
                p = w[:j] + "*" + w[j + 1 :]
                n[p].append(w)

        # bfs
        v = set([beginWord])
        q = collections.deque([beginWord])
        r = 1
        while q:
            for i in range(len(q)):
                w = q.popleft()
                if w == endWord:
                    return r
                for j in range(len(w)):
                    p = w[:j] + "*" + w[j + 1 :]
                    for nw in n[p]:
                        if nw not in v:
                            v.add(nw)
                            q.append(nw)
            r += 1
        return 0
