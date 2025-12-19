from typing import List


# O(N + V + E) Time | O(V + E)
# N = sum of the lengths of all the strings
# V = number of unique characters
# E = number of edges
class Solution:
    def foreignDictionary(self, words: List[str]) -> str:
        # Adjacent map with sets for each character of the
        # words array to an empty set
        adjMap = {c: set() for w in words for c in w}

        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            minLen = min(len(w1), len(w2))

            # Check if the prefix of the words is the exact same
            # and if the length of the w1 is greater than length of w2
            if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:
                # This means that the ordering is invalid
                return ""

            for j in range(minLen):
                if w1[j] != w2[j]:
                    adjMap[w1[j]].add(w2[j])
                    break

        visit = {}  # False = visited, True = current path
        res = []

        def dfs(char):
            if char in visit:
                return visit[char]

            visit[char] = True

            for nChar in adjMap[char]:
                if dfs(nChar):
                    return True

            visit[char] = False
            res.append(char)

        # Check for cycles
        for c in adjMap:
            if dfs(c):
                return ""

        # The answer is on reverse ordering
        res.reverse()
        return "".join(res)


"""
Example: words = ["wrt", "wrf", "er", "ett", "rftt"]

Step 1: Build adjMap with all characters
adjMap = {'w': set(), 'r': set(), 't': set(), 'f': set(), 'e': set()}

Step 2: Compare adjacent words to find ordering rules
- Compare "wrt" vs "wrf": First diff at index 2: 't' != 'f' → t comes before f
  adjMap['t'].add('f') → {'w': set(), 'r': set(), 't': {'f'}, 'f': set(), 'e': set()}

- Compare "wrf" vs "er": First diff at index 0: 'w' != 'e' → w comes before e
  adjMap['w'].add('e') → {'w': {'e'}, 'r': set(), 't': {'f'}, 'f': set(), 'e': set()}

- Compare "er" vs "ett": First diff at index 1: 'r' != 't' → r comes before t
  adjMap['r'].add('t') → {'w': {'e'}, 'r': {'t'}, 't': {'f'}, 'f': set(), 'e': set()}

- Compare "ett" vs "rftt": First diff at index 0: 'e' != 'r' → e comes before r
  adjMap['e'].add('r') → {'w': {'e'}, 'r': {'t'}, 't': {'f'}, 'f': set(), 'e': {'r'}}

Step 3: DFS to build topological order (checking for cycles)
Graph structure: w → e → r → t → f

DFS traversal (post-order):
- Start with 'w': visit['w'] = True
  - Visit 'e': visit['e'] = True
    - Visit 'r': visit['r'] = True
      - Visit 't': visit['t'] = True
        - Visit 'f': visit['f'] = True
        - No more neighbors, visit['f'] = False, res = ['f']
      - Done with 't', visit['t'] = False, res = ['f', 't']
    - Done with 'r', visit['r'] = False, res = ['f', 't', 'r']
  - Done with 'e', visit['e'] = False, res = ['f', 't', 'r', 'e']
- Done with 'w', visit['w'] = False, res = ['f', 't', 'r', 'e', 'w']

Step 4: Reverse the result
res.reverse() → ['w', 'e', 'r', 't', 'f']

Answer: "wertf"
"""
