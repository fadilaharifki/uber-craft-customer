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
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: null | string;
  }>({
    width: 0,
    height: 0,
    breakpoint: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth),
      });
    };

    handleResize(); // Set nilai saat pertama kali mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
