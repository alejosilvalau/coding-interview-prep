// O(n∗Log(Max(Piles))) | O(1) space
// n == number of piles
// Max(Piles) == maximum number of bananas in a pile
function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  let minBananaPerHour = right;

  while (left < right) {
    const k = Math.floor((left + right) / 2);
    let hours = 0;

    for (let pile of piles) {
      hours += Math.ceil(pile / k);
    }

    if (hours <= h) {
      right = k;
      minBananaPerHour = k;
    } else {
      left = k + 1;
    }
  }

  return minBananaPerHour;
}
