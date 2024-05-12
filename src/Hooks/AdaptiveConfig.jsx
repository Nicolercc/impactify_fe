import { useLayoutEffect, useState } from "react";
import ParallaxConfig from "./ParallaxConfig";

export const Adaptive = Object.freeze({
	xs: "xs",
	s: "s",
	m: "m",
	l: "l",
	xl: "xl",
});

export function useAdaptiveTriggers() {
	const [parallaxConfig, setParallaxConfig] = useState(ParallaxConfig.xl);

	useLayoutEffect(() => {
		const handleResize = () => {
			if (window?.innerWidth < 768) {
				console.log("xs screen");
				return setParallaxConfig(ParallaxConfig.xs);
			}
			if (window?.innerWidth < 1024) {
				console.log("s screen");
				return setParallaxConfig(ParallaxConfig.s);
			}
			if (window?.innerWidth < 1280) {
				console.log("m screen");
				return setParallaxConfig(ParallaxConfig.m);
			}
			if (window?.innerWidth < 1440) {
				console.log("l screen");
				return setParallaxConfig(ParallaxConfig.l);
			}

			return setParallaxConfig(ParallaxConfig.xl);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return {
		parallaxConfig,
	};
}
