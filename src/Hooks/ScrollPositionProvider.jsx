import { useState, useEffect } from "react";

//this hook is meant to track the scroll position of a given element

function useScrollPosition({ element }) {
	//element reference returns a boolean indicating if the el has been scrolled

	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		const container = element.current.container.current;

		const handleOnScroll = () => {
			setScrolling(container.scrollTop > 0);
		};

		if (container) {
			container.addEventListener("scroll", handleOnScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", handleOnScroll);
			}
		};
	}, [element]);

	return scrolling;
}

export default useScrollPosition;
