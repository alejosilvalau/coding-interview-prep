// O(n^2) Time | O(n^2) Space
// The giant time and space complexity is due to the maps in the "teamMaps" array.

export function stableInternships(interns: number[][], teams: number[][]) {
	const chosenInterns: Record<number, number> = {};
	const freeInterns = interns.map((_, i) => i);
	const currentInternChoices = new Array(interns.length).fill(0);

	const teamMaps: Record<number, number>[] = [];
	for (const team of teams) {
		const rank: Record<number, number> = {};
		team.forEach((internNum, i) => {
			rank[internNum] = i;
		});
		teamMaps.push(rank);
	}

	while (freeInterns.length > 0) {
		const internNum = freeInterns.pop()!;

		const intern = interns[internNum];
		const teamPreference = intern[currentInternChoices[internNum]];
		currentInternChoices[internNum] += 1;

		if (!(teamPreference in chosenInterns)) {
			chosenInterns[teamPreference] = internNum;
			continue;
		}

		const previousIntern = chosenInterns[teamPreference];
		const previousInterRank = teamMaps[teamPreference][previousIntern];
		const currentInternRank = teamMaps[teamPreference][internNum];

		if (currentInternRank < previousInterRank) {
			freeInterns.push(previousIntern);
			chosenInterns[teamPreference] = internNum;
		} else {
			freeInterns.push(internNum);
		}
	}

	const matches = Object.entries(chosenInterns).map(([teamNum, internNum]) => [
		internNum,
		parseInt(teamNum),
	]);
	return matches;
}
