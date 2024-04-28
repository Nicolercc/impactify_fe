import { useLayoutEffect, useState } from "react";

export const Adaptive = Object.freeze({
	xs: "xs",
	s: "s",
	m: "m",
	l: "l",
	xl: "xl",
});

export function useAdaptiveTriggers({
	onExtraSmallEnter,
	onSmallEnter,
	onMediumEnter,
	onLargeEnter,
	onExtraLargeEnter,
}) {
	const [width, setWidth] = useState(Adaptive.xl);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window?.innerWidth < 768) {
				onExtraSmallEnter?.();
				return setWidth(Adaptive.xs);
			}
			if (window?.innerWidth < 1024) {
				onSmallEnter?.();
				return setWidth(Adaptive.s);
			}
			if (window?.innerWidth < 1280) {
				onMediumEnter?.();
				return setWidth(Adaptive.m);
			}
			if (window?.innerWidth < 1440) {
				onLargeEnter?.();
				return setWidth(Adaptive.l);
			}
			onExtraLargeEnter?.();
			return setWidth(Adaptive.xl);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [
		onSmallEnter,
		onMediumEnter,
		onLargeEnter,
		onExtraLargeEnter,
		onExtraSmallEnter,
	]);

	return width;
}
