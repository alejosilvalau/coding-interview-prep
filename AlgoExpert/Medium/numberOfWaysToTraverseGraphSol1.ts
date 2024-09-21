// O(2^(n + m)) time | O(n + m) space
// n = width, m = height
// This is the recursive solution

export function numberOfWaysToTraverseGraph(
	width: number,
	height: number
): number {
	if (width === 1 || height === 1) return 1;

	return (
		numberOfWaysToTraverseGraph(width - 1, height) +
		numberOfWaysToTraverseGraph(width, height - 1)
	);
}
