import { expoOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface FadeWipeOptions {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	direction?: string; // Satisfies any linear-gradient direction
}

const FADE_WIPE_DEFAULTS = {
	delay: 0,
	duration: 350,
	easing: expoOut,
	direction: 'to right'
} satisfies FadeWipeOptions;

export const fadeWipe = (node: HTMLElement, options?: FadeWipeOptions | undefined) => {
	const { duration, delay, easing, direction } = {
		...FADE_WIPE_DEFAULTS,
		...options
	};

	// const style = getComputedStyle(node);

	// TODO: Get the current computed mask so we can maintain the current mask styles as we apply new ones.
	//
	// For now though, we'll just create our mask and apply it.

	return {
		duration,
		delay,
		easing,
		css: (t) => {
			const mask = `linear-gradient(${direction}, black ${Math.pow(t, 4) * 100}%, transparent ${t * 100}%)`;

			return `
        mask-image: ${mask};
      `;
		}
	} as TransitionConfig;
};
