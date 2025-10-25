// O(n) time | O(n) space
// n == length of the input array
export function minRewards(scores: number[]) {
  const rewards = scores.map(_ => 1);
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1;
  }
  for (let i = scores.length - 2; i >= 0; i--) {
    if (scores[i] > scores[i + 1]) rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1);
  }
  return rewards.reduce((a, b) => a + b);
}
