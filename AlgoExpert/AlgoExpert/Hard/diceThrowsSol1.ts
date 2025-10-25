// O(d * s * t) time | O(d * t) space
// d == the number of the dice
// s == the number of sides
// t == the target number
export function diceThrows(numDice: number, numSides: number, target: number) {
  const storedResults = new Array(numDice + 1).fill(undefined).map(_ => new Array(target + 1).fill(0));
  storedResults[0][0] = 1;

  for (let currentNumDice = 1; currentNumDice < numDice + 1; currentNumDice++) {
    for (let currentTarget = 0; currentTarget < target + 1; currentTarget++) {
      let numWaysToReachTarget = 0;

      for (let currentNumSides = 1; currentNumSides < Math.min(currentTarget, numSides) + 1; currentNumSides++) {
        numWaysToReachTarget += storedResults[currentNumDice - 1][currentTarget - currentNumSides];
      }
      storedResults[currentNumDice][currentTarget] = numWaysToReachTarget;
    }
  }
  return storedResults[numDice][target];
}
