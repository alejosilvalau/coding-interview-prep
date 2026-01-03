# O(m * n) time | O(m * n) space
# m == length of s
# n == length of p

# * means repeat 0 or more times of the preceding element
# Therefore, if you have "a*" makes "" a valid string.
#
# The big decision of this algorithm is between repeating
# the preceding character or skipping it entirely.
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        R, C = len(s), len(p)

        dp = [[False] * (C + 1) for _ in range(R + 1)]

        dp[R][C] = True

        for r in range(R, -1, -1):
            for c in range(C - 1, -1, -1):
                # The current characters match
                first_match = r < R and (p[c] == s[r] or p[c] == ".")

                # If the next character is "*", we can
                # skip it (c + 2) or use it if there's a match.
                if c + 1 < C and p[c + 1] == "*":
                    dp[r][c] = dp[r][c + 2] or (first_match and dp[r + 1][c])
                else:
                    # If there is no "*", we can move
                    # diagonally if there's a match.
                    dp[r][c] = first_match and dp[r + 1][c + 1]

        return dp[0][0]


"""
ALGORITHM TRACE: Regular Expression Matching (Bottom-Up DP)
Example: s = "aa", p = "a*"

The DP table dp[r][c] represents if s[r:] matches p[c:].
Indices R=2, C=2 represent the 'Empty String' and 'Empty Pattern'.

INITIAL STATE:
    a  * (empty)
a [ .  .  . ]
a [ .  .  . ]
_ [ .  .  T ]  <-- dp[2][2] = True (Base Case: "" matches "")

ITERATION LOGIC:
1. r = 2, c = 1 (s="", p="*"): Skip, logic handles '*' at the character before it.
2. r = 2, c = 0 (s="", p="a*"): 
   - c+1 is '*', so dp[2][0] = dp[2][2] (Zero match case).
   - Result: dp[2][0] = True (Pattern "a*" matches empty string "")

3. r = 1, c = 1 (s="a", p="*"): Skip.
4. r = 1, c = 0 (s="a", p="a*"):
   - first_match = (s[1] == p[0]) -> True ('a' == 'a')
   - c+1 is '*', so dp[1][0] = dp[1][2] OR (first_match AND dp[2][0])
   - dp[1][0] = False OR (True AND True) = True

5. r = 0, c = 0 (s="aa", p="a*"):
   - first_match = (s[0] == p[0]) -> True ('a' == 'a')
   - dp[0][0] = dp[0][2] OR (first_match AND dp[1][0])
   - dp[0][0] = False OR (True AND True) = True
r < R
FINAL DP TABLE:
      'a'    '*'   (empty)
'a' [ True, False, False ] (dp[0][0] is our answer)
'a' [ True, False, False ]
''  [ True, False, True  ]

VARIABLES:
- first_match: Checks if s[r] matches p[c] or p[c] == '.'
- dp[r][c+2]: "Zero match" - Ignore 'char*' and see if rest of pattern matches.
- dp[r+1][c]: "Repeat match" - Consume one char from 's' and keep the 'char*' pattern.
"""
