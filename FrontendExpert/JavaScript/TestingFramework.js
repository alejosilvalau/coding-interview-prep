function describe(testSuiteName, func) {
	// This defines a test suite.
	console.log(`beginning test suite ${testSuiteName}`);

	try {
		func();
		console.log(`successfully completed test suite ${testSuiteName}`);
	} catch (error) {
		const { testCaseName, errorMessage } = error;
		console.error(
			`failed running test suite ${testSuiteName} on ` +
				`test case ${testCaseName} with error message ${errorMessage}`
		);
	}
}

function it(testCaseName, func) {
	// This defines a test case.
	console.log(`beginning test case ${testCaseName}`);

	try {
		func();
		console.log(`successfully completed test case ${testCaseName}`);
	} catch (errorMessage) {
		throw { testCaseName, errorMessage };
	}
}

function expect(actual) {
	// This is a single check within a test case
	// The solution started here, in the smaller block.
	return new ExpectFunctions(actual);
}

class ExpectFunctions {
	constructor(actual) {
		this.actual = actual;
		this.stringifiedActual = JSON.stringify(actual);
	}

	toExist() {
		if (this.actual == null) {
			throw `expected value to exist but got ${this.stringifiedActual}`;
		}
	}

	toBe(expected) {
		if (this.actual !== expected) {
			throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
				expected
			)}`;
		}
	}

	toBeType(type) {
		if (typeof this.actual !== type) {
			throw `expected ${
				this.stringifiedActual
			} to be type ${type} but got ${typeof this.actual}`;
		}
	}
}

// Do not edit the lines below.
exports.describe = describe;
exports.it = it;
exports.expect = expect;
