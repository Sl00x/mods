import { debounce } from "lodash";
import { useLayoutEffect, useRef, useState } from "react";

export interface Percentage {
  vertical: number;
  horizontal: number;
}
export interface UseScrollPercentageOptions {
  onProgress?: (percentage: Percentage) => void;
  windowScroll?: boolean;
  timeout?: number;
}

const useScrollPercentage = <T extends HTMLElement>(
  options?: UseScrollPercentageOptions
) => {
  const { onProgress, windowScroll, timeout } = options || {};

  const ref = useRef<T>(null);
  const [percentage, setPercentage] = useState<Percentage>({
    vertical: 0,
    horizontal: 0,
  });

  useLayoutEffect(() => {
    let mounted = true;

    const container = windowScroll ? document.scrollingElement! : ref.current;
    const listener = windowScroll ? document : ref.current;

    const handleScroll = debounce(() => {
      if (mounted && container) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth,
        } = container;

        const getProgress = (
          scrollPos: number,
          scrollSize: number,
          clientSize: number
        ) => +((scrollPos / (scrollSize - clientSize)) * 100).toFixed(2);

        const verticalProgress = getProgress(
          scrollTop,
          scrollHeight,
          clientHeight
        );
        const horizontalProgress = getProgress(
          scrollLeft,
          scrollWidth,
          clientWidth
        );

        const percentage = {
          vertical: isNaN(verticalProgress) ? 0 : verticalProgress,
          horizontal: isNaN(horizontalProgress) ? 0 : horizontalProgress,
        };

        setPercentage(percentage);
        onProgress?.(percentage);
      }
    }, timeout ?? 10);

    listener?.addEventListener("scroll", handleScroll);

    return () => {
      mounted = false;
      listener?.removeEventListener("scroll", handleScroll);
    };
  }, [onProgress, ref, timeout, windowScroll]);

  return { percentage, ref };
};

export default useScrollPercentage;
