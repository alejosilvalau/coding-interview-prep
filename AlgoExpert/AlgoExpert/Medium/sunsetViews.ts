// O(n) time | O(n) space
// n = length of the input array
export enum Direction {
	East = "EAST",
	West = "WEST",
}

export function sunsetViews(buildings: number[], direction: Direction) {
	const buildingWithSunsetViews: number[] = [];

	const startIdx = direction === Direction.West ? 0 : buildings.length - 1;
	const step = direction === Direction.West ? 1 : -1;

	let idx = startIdx;
	let runningMaxHeight = 0;
	while (idx >= 0 && idx < buildings.length) {
		const buildingHeight = buildings[idx];

		if (buildingHeight > runningMaxHeight) buildingWithSunsetViews.push(idx);

		runningMaxHeight = Math.max(runningMaxHeight, buildingHeight);

		idx = idx + step;
	}

	if (direction === Direction.East) buildingWithSunsetViews.reverse();

	return buildingWithSunsetViews;
}
