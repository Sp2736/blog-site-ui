import React, { useEffect, useRef } from "react";

export default function GroovyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const render = () => {
      time += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      // Cream background
      ctx.fillStyle = "#fef3c7";
      ctx.fillRect(0, 0, w, h);

      // 70s Color Palette
      const colors = [
        "#ea580c", // Burnt Orange
        "#eab308", // Mustard Yellow
        "#65a30d", // Avocado Green
        "#d97706", // Deep Ochre
      ];

      // Draw undulating organic ribbons
      colors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.beginPath();

        // Start from left side, staggered down
        ctx.moveTo(0, h + 100);
        ctx.lineTo(0, h * 0.3 + index * 150);

        // Create wavy bezier curve across the screen
        for (let x = 0; x <= w; x += 50) {
          // Complex sine wave math for organic flow
          const wave1 = Math.sin(x * 0.005 + time + index) * 100;
          const wave2 = Math.cos(x * 0.003 - time * 0.8) * 80;
          const y = h * 0.3 + index * 150 + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h + 100);
        ctx.closePath();

        // Add drop shadow to separate the ribbons
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Add a groovy texture overlay (subtle grain)
      ctx.fillStyle = "rgba(60, 40, 0, 0.03)";
      for (let i = 0; i < 5000; i++) {
        ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
