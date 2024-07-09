function correspondingNode(tree1, tree2, node1) {
	// Write your code here.
	const stack1 = [tree1];
	const stack2 = [tree2];

	while (stack1.length > 0) {
		const curr1 = stack1.pop();
		const curr2 = stack2.pop();

		if (curr1 === node1) return curr2;

		stack1.push(...curr1.children);
		stack2.push(...curr2.children);
	}
}

// Do not edit the line below.
exports.correspondingNode = correspondingNode;
