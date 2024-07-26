import tailwindConfig from "../../tailwind.config";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

function getWindowSize() {
  if (typeof window === "undefined") return null;
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export const useBreakpoint = (size: "sm" | "md" | "lg") => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [breakpoint] = useState(
    Number.parseInt(fullConfig.theme?.screens?.[size].replace("px", "")),
  );
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
