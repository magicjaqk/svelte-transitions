import { Spring } from 'svelte/motion';
import type { TransitionConfig } from 'svelte/transition';

interface SpringCollapseOptions {
	delay?: number;
	damping?: number;
	stiffness?: number;
	precision?: number;
}

export function springCollapse(node: HTMLElement, options?: SpringCollapseOptions) {
	const nodeHeight = node.getBoundingClientRect().height;
	const spring = new Spring(nodeHeight, {
		damping: options?.damping || 0.8,
		stiffness: options?.stiffness || 100,
		precision: options?.precision || 0.01
	});

	return {
		duration: Infinity,
		easing: (t: number) => t,
		tick: (t: number) => {
			if (t >= 0) {
				spring.set(nodeHeight);
			} else {
				spring.set(0).then(() => {
					node.remove();
				});
			}

			node.style.height = `${spring.current}px`;
		}
	} as TransitionConfig;
}
