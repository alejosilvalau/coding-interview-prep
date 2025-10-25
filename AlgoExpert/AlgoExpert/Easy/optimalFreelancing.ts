export function optimalFreelancing(jobs: Record<string, number>[]) {
	const LENGTH_OF_WEEK = 7;
	let profit = 0;

	jobs.sort((jobA, jobB) => jobB.payment - jobA.payment);

	const timeline = new Array(LENGTH_OF_WEEK).fill(false);
	for (const job of jobs) {
		const maxTime = Math.min(job.deadline, LENGTH_OF_WEEK);

		for (let time = maxTime - 1; time >= 0; time--) {
			if (timeline[time] == false) {
				timeline[time] = true;
				profit += job.payment;
				break;
			}
		}
	}

	return profit;
}
