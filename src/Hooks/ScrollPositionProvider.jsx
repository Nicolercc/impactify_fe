import { useState, useEffect } from "react";

function useScrollPosition({ element }) {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const container = element.current.container.current;

    const handleOnScroll = () => {
      setScrolling(container.scrollTop > 0);
    };

    if (container) {
      container.addEventListener('scroll', handleOnScroll);
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
