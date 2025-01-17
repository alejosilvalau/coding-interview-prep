class EventTarget {
	// Write your code here.
	constructor() {
		this.listeners = {};
	}

	addEventListener(name, callback) {
		// Write your code here.
		if (!this.listeners.hasOwnProperty(name)) {
			this.listeners[name] = new Set();
		}
		this.listeners[name].add(callback);
	}

	removeEventListener(name, callback) {
		// Write your code here.
		this.listeners[name]?.delete(callback);
	}

	dispatchEvent(name) {
		// Write your code here.
		this.listeners[name]?.forEach((callback) => {
			callback();
		});
	}
}

// Do not edit the line below.
exports.EventTarget = EventTarget;
