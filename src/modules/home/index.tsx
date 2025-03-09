"use client";

import LayoutComponent from "@/components/Layout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const aircraftOptions = [
  { name: "Private Jet", angle: 0 },
  { name: "Turbo prop", angle: 45 },
  { name: "Heli copter", angle: 90 },
  { name: "Wide Body", angle: 135 },
  { name: "Air Cargo", angle: 180 },
  { name: "Air Ambulance", angle: 225 },
  { name: "Air Taxi", angle: 270 },
  { name: "Joy Flight", angle: 315 },
];

const HomePageModules = () => {
  const [selectedOption, setSelectedOption] = useState(aircraftOptions[0]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  // Calculate sizes based on screen size
  const dialSize = isMobile ? 200 : isSmallScreen ? 400 : 450;
  const needleHeight = isMobile ? 120 : isSmallScreen ? 300 : 280;
  const needleHeightCompare = isMobile ? 30 : isSmallScreen ? 50 : 100;
  const labelRadius = isMobile ? 140 : isSmallScreen ? 240 : 290;
  const centerPointSize = isMobile ? 20 : 30;
  const borderWidth = isMobile ? 4 : 6;
  const tickWidth = isMobile ? 40 : 100;
  const tickHeight = isMobile ? 8 : 10;
  return (
    <LayoutComponent>
      <div
        className="flex justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex-col items-center p-4"
        style={{
          backgroundImage: "url('/assets/images/image-aircraft.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        {/* Dial Container */}
        <div
          className="relative mb-8 mx-auto"
          style={{
            width: `${dialSize}px`,
            height: `${dialSize}px`,
          }}
        >
          {/* Circular Background */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
            style={{ borderWidth: borderWidth, borderColor: "white" }}
          >
            {/* Dotted Globe Pattern - Using squares instead of circles */}
            <div className="absolute inset-0">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="dotOpacity" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                  </radialGradient>

                  {/* Create a curved grid pattern */}
                  <pattern
                    id="squarePattern"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x="2" y="2" width="4" height="4" fill="white" />
                  </pattern>

                  {/* Create a mask for the curved effect */}
                  <mask id="gridMask">
                    {/* Generate grid of squares */}
                    {Array.from({ length: 25 }).map((_, row) =>
                      Array.from({ length: 25 }).map((_, col) => {
                        const x = col * 20;
                        const y = row * 20;
                        // Calculate distance from center for curve effect
                        const centerX = 250;
                        const centerY = 250;
                        const dx = x - centerX;
                        const dy = y - centerY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const opacity = Math.max(0, 1 - distance / 250);

                        return (
                          <rect
                            key={`${row}-${col}`}
                            x={x}
                            y={y}
                            width="4"
                            height="4"
                            fill="white"
                            opacity={opacity}
                          />
                        );
                      })
                    )}
                  </mask>
                </defs>

                {/* Apply the pattern with masking */}
                <rect
                  width="500"
                  height="500"
                  fill="url(#squarePattern)"
                  mask="url(#gridMask)"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* Center Point - Light blue circle */}
            <div
              className="absolute bg-blue-200 rounded-full z-20 opacity-80"
              style={{
                width: `${centerPointSize}px`,
                height: `${centerPointSize}px`,
              }}
            ></div>

            {/* Needle - White triangle - LONGER to reach text */}
            <div
              className="absolute z-10 origin-center transition-transform duration-500 ease-in-out"
              style={{ transform: `rotate(${selectedOption.angle}deg)` }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ height: `${needleHeight * 1.2}px` }}
              >
                {/* Triangular needle - Made longer */}
                <div
                  className="absolute flex items-start justify-center"
                  style={{ height: `${needleHeight + needleHeightCompare}px` }}
                >
                  <div
                    className="w-0 h-0 border-l-transparent rounded-full border-r-transparent border-b-white"
                    style={{
                      borderLeftWidth: `${isMobile ? 8 : 12}px`,
                      borderRightWidth: `${isMobile ? 8 : 12}px`,
                      borderBottomWidth: `${needleHeight}px`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tick Marks - Horizontal lines */}
            <div className="absolute w-full h-full">
              {/* Left tick */}
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-300"
                style={{
                  left: `${isMobile ? 6 : 8}px`,
                  width: `${tickWidth}px`,
                  height: `${tickHeight}px`,
                }}
              ></div>
              {/* Right tick */}
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-300"
                style={{
                  right: `${isMobile ? 6 : 8}px`,
                  width: `${tickWidth}px`,
                  height: `${tickHeight}px`,
                }}
              ></div>
            </div>
          </div>

          {/* Option Labels */}
          {aircraftOptions.map((option) => {
            const angle = option.angle * (Math.PI / 180);
            const radius = labelRadius;
            const x = Math.sin(angle) * radius;
            const y = -Math.cos(angle) * radius;

            return (
              <button
                key={option.name}
                className={twMerge(
                  "absolute text-white w-12 md:w-32 text-center break-words transform -translate-x-1/2 -translate-y-1/2 transition-all",
                  "text-sm md:text-lg lg:text-xl font-semibold",
                  selectedOption.name === option.name
                    ? "font-bold scale-110"
                    : ""
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                onClick={() => setSelectedOption(option)}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default HomePageModules;
