export function popElement(node: HTMLElement) {
	// Get the on-screen position of the popElement
	const boundingRect = node.getBoundingClientRect();
	// Apply a fixed position to the element including any current transforms, etc.
	node.style.position = 'fixed';
	node.style.top = `${boundingRect.top}px`;
	node.style.left = `${boundingRect.left}px`;
	node.style.width = `${boundingRect.width}px`;
	node.style.height = `${boundingRect.height}px`;

	// Return the element and it's current styles for further adjustment outside the function
	return {
		node,
		computedStyle: getComputedStyle(node)
	};
}
