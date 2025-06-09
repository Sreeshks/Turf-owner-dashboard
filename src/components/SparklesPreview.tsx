"use client";
import React from "react";
import { SparklesCore } from '../components/ui/sparkles/SparklesCore';

export function SparklesPreview() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Fullscreen sparkles in background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        {/* Optional radial fade mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(600px_300px_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Centered text on top of sparkles */}
      
    </div>
  );
}
