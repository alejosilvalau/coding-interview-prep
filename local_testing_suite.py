import json

def function(s, k):
  print(f'Input: s="{s}", k="{k}"')
# Test cases
test_cases = [{"s": [1, 3, -1, -3, 5, 3, 6, 7], "k": 3, "expected": [3, 3, 5, 5, 6, 7]}]

for test in test_cases:
    result = function(test["s"], test["k"])
    print(f'Input: s="{test["s"]}", t="{test["k"]}"')
    print(f'Output: "{result}"')
    print(f'Expected: "{test["expected"]}"')
    print(f'Test {"PASSED" if json.dumps(result) == json.dumps(test["expected"]) else "FAILED"}')
    print('-------------------')