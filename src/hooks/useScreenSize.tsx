"use client";

import { useState, useEffect } from "react";

const getBreakpoint = (width: number) => {
  if (width < 640) return "sm";
  if (width < 768) return "md";
  if (width < 1024) return "lg";
  if (width < 1280) return "xl";
  return "2xl";
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    breakpoint: "sm",
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth),
      });
    };

    // Set initial screen size
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
