// O(v + e) time | O(v) space
// v = number of vertices
// e = number of edges
// "true" and "false" in the "colors" array
// represent each color.

export function twoColorable(edges: number[][]) {
	const colors: Array<null | boolean> = edges.map((_) => null);
	colors[0] = true;
	const stack = [0];

	while (stack.length > 0) {
		const node = stack.pop()!;
		for (const connection of edges[node]) {
			if (colors[connection] === null) {
				colors[connection] = !colors[node];
				stack.push(connection);
			} else if (colors[connection] === colors[node]) {
				return false;
			}
		}
	}

	return true;
}
