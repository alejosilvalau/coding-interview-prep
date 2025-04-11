// O(n) time | O(n) space
// n == number of temperatures in the input array
function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array<number>(temperatures.length).fill(0);
  const idxStack: number[] = [];

  temperatures.forEach((currTemp, currIdx) => {
    while (idxStack.length && currTemp > temperatures[idxStack[idxStack.length - 1]]) {
      const poppedIdx = idxStack.pop()!;
      answer[poppedIdx] = currIdx - poppedIdx;
    }

    idxStack.push(currIdx);
  });

  return answer;
}
