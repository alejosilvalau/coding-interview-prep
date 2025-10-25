// O(n) time | O(1) space
// n = length of the input array
//
// This is a greedy algorithm.

export function validStartingCity(
	distances: number[],
	fuel: number[],
	mpg: number
) {
	const numberOfCities = distances.length;
	let milesRemaining = 0;

	let indexOfStartingCityCandidate = 0;
	let milesRemainingAtStartingCityCandidate = 0;

	for (let cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
		const distanceFromPreviousCity = distances[cityIdx - 1];
		const fuelFromPreviousCity = fuel[cityIdx - 1];
		milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

		if (milesRemaining < milesRemainingAtStartingCityCandidate) {
			milesRemainingAtStartingCityCandidate = milesRemaining;
			indexOfStartingCityCandidate = cityIdx;
		}
	}
	return indexOfStartingCityCandidate;
}
