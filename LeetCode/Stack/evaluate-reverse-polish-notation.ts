// O(n) time | O(n) space
// n == number of elements in the input array
interface IOperations {
  [key: string]: (a: number, b: number) => number;
}

function evalRPN(tokens: string[]): number {
  const operatorSets: IOperations = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => (a / b) | 0,
  };
  const stack: number[] = [];
  tokens.forEach(r => {
    if (operatorSets[r] != null) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(operatorSets[r](a, b));
    } else {
      stack.push(Number(r));
    }
  });
  return stack.pop()!;
}
