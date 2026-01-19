import { expoOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface Params {
	axis: 'x' | 'y';
}

export function colorwipe(
	node: HTMLElement,
	{ axis = 'x' }: Params,
	options: { direction: 'in' | 'out' | 'both' }
): TransitionConfig {
	const nodeRect = node.getBoundingClientRect();
	const nodeColor = window.getComputedStyle(node).color;

	// Append a color wiping node to the document at the same rect as the original node
	const wipeNode = document.createElement('div');
	wipeNode.id = `${node.id ?? JSON.stringify(node.firstChild)}-colowipe`;
	wipeNode.style.position = 'absolute';
	wipeNode.style.top = `${nodeRect.top}px`;
	wipeNode.style.left = `${nodeRect.left}px`;
	wipeNode.style.width = `${nodeRect.width}px`;
	wipeNode.style.height = `${nodeRect.height}px`;
	wipeNode.style.backgroundColor = nodeColor;

	// Assign the initial clip-path
	if (options.direction === 'in') {
		wipeNode.style.clipPath = 'inset(0% 0% 0% 100%)';
		node.style.clipPath = 'inset(0% 0% 0% 100%)';
	} else {
		wipeNode.style.clipPath = 'inset(0% 0% 0% 100%)';
		node.style.clipPath = 'inset(0% 0% 0% 0%)';
	}

	const existingWipeNode = document.getElementById(
		`${node.id ?? JSON.stringify(node.firstChild)}-colowipe`
	);
	if (existingWipeNode) {
		existingWipeNode.remove();
	}

	document.body.appendChild(wipeNode);

	return {
		duration: 550,
		easing: expoOut,
		tick(t) {
			const leftWipeProgress = Math.max(0, (1 - t * 2) * 100);
			const rightWipeProgress = t * 100;
			const wordWipeProgress = (1 - t) * 100;

			if (axis === 'x') {
				if (options.direction === 'in') {
					wipeNode.style.setProperty(
						'clip-path',
						`inset(0% ${leftWipeProgress}% 0% ${rightWipeProgress}%)`
					);
					node.style.setProperty('clip-path', `inset(0% ${wordWipeProgress}% 0% 0%)`);
				} else {
					wipeNode.style.setProperty(
						'clip-path',
						`inset(0% ${rightWipeProgress}% 0% ${leftWipeProgress}%)`
					);
					node.style.setProperty('clip-path', `inset(0% 0% 0% ${wordWipeProgress}%)`);
				}
			} else {
				if (options.direction === 'in') {
					wipeNode.style.setProperty(
						'clip-path',
						`inset(${rightWipeProgress}% 0% ${leftWipeProgress}% 0%)`
					);
					node.style.setProperty('clip-path', `inset(0% 0% ${wordWipeProgress}% 0%)`);
				} else {
					wipeNode.style.setProperty(
						'clip-path',
						`inset( ${leftWipeProgress}% 0% ${rightWipeProgress}% 0%)`
					);
					node.style.setProperty('clip-path', `inset(${wordWipeProgress}% 0% 0% 0%)`);
				}
			}
		}
	};
}
