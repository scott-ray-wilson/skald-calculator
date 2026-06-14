import { useEffect, useState } from "react";

// Tailwind's default breakpoints (px). The project doesn't customize `screens`,
// so these mirror the framework defaults (previously read via resolveConfig,
// which was removed in Tailwind v4's CSS-first config).
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 } as const;

function getWindowSize() {
  if (typeof window === "undefined") return null;
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export const useBreakpoint = (size: "sm" | "md" | "lg") => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [breakpoint] = useState(BREAKPOINTS[size]);
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize?.innerWidth ? windowSize.innerWidth <= breakpoint : null;
};
