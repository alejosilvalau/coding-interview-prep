class EventTarget {
	// Write your code here.
	constructor() {
		this.mappings = {};
	}

	addEventListener(name, callback) {
		// Write your code here.
		if (mappings.hasOwnProperty(name)) {
			let index = mappings[name].findIndex(callback);
			if (index === -1) {
				mappings[name].push(callback);
			}
		} else {
			mappings[name] = [callback];
		}
	}

	removeEventListener(name, callback) {
		// Write your code here.
	}

	dispatchEvent(name) {
		// Write your code here.
	}
}

// Do not edit the line below.
exports.EventTarget = EventTarget;
