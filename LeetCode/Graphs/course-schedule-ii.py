from typing import List


# O(n + m) time | O(n + m) space
# n == Number of courses
# m == Number of prerequisites
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for i in range(numCourses)]
        indegree = [0] * numCourses
        for next, prev in prerequisites:
            indegree[next] += 1
            adj[prev].append(next)

        result = []

        def dfs(node):
            result.append(node)
            indegree[node] -= 1
            for neighbour in adj[node]:
                indegree[neighbour] -= 1
                if indegree[neighbour] == 0:
                    dfs(neighbour)

        for i in range(numCourses):
            if indegree[i] == 0:
                dfs(i)

        return result if len(result) == numCourses else []
