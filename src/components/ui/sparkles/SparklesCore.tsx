"use client";

import React, { useId, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine, Container } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number; 
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const controls = useAnimation();
  const generatedId = useId();

  const [initDone, setInitDone] = useState(false);

  // Called by Particles component to initialize the engine
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
    setInitDone(true);
  };

  // Called when particles are loaded and container is ready
  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  return (
    <motion.div animate={controls} className={clsx("opacity-0", className)}>
      <Particles
        id={id || generatedId}
        className={clsx("h-full w-full")}
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: background || "#0d47a1",
            },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: false, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            bounce: {
              horizontal: { value: 1 },
              vertical: { value: 1 },
            },
            collisions: {
              enable: false,
              mode: "bounce",
              overlap: { enable: true, retries: 0 },
            },
            color: {
              value: particleColor || "#ffffff",
            },
            move: {
              enable: true,
              speed: { min: 0.1, max: 1 },
              direction: "none",
              outModes: { default: "out" },
            },
            number: {
              density: { enable: true, width: 400, height: 400 },
              value: particleDensity || 120,
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed: speed || 4,
                sync: false,
              },
            },
            shape: { type: "circle" },
            size: {
              value: { min: minSize || 1, max: maxSize || 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
};
