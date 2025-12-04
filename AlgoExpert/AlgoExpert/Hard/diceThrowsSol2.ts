// O(d * s * t) time | O(t) space
// d == the number of the dice
// s == the number of sides
// t == the target number
export function diceThrows(numDice: number, numSides: number, target: number) {
  const storedResults = [new Array(target + 1).fill(0), new Array(target + 1).fill(0)];
  storedResults[0][0] = 1;

  let previousNumDiceIndex = 0;
  let newNumDiceIndex = 1;
  for (let i = 0; i < numDice; i++) {
    for (let currentTarget = 0; currentTarget < target + 1; currentTarget++) {
      let numWaysToReachTarget = 0;
      for (let currentNumSides = 1; currentNumSides < Math.min(currentTarget, numSides) + 1; currentNumSides++) {
        numWaysToReachTarget += storedResults[previousNumDiceIndex][currentTarget - currentNumSides];
      }
      storedResults[newNumDiceIndex][currentTarget] = numWaysToReachTarget;
    }

    const temp = previousNumDiceIndex;
    previousNumDiceIndex = newNumDiceIndex;
    newNumDiceIndex = temp;
  }

  return storedResults[previousNumDiceIndex][target];
}
