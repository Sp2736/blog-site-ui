import React, { useEffect, useRef } from "react";

class TrailPoint {
  x: number;
  y: number;
  life: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = 1;
  }
}

class Sparkle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.life = 0;
    this.maxLife = Math.random() * 20 + 20;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    this.size *= 0.95;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function MeteorCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const sparkles: Sparkle[] = [];
    const trail: TrailPoint[] = [];

    const TRAIL_DECAY = 0.016;
    const TRAIL_WIDTH = 3;
    const SPARKLE_COUNT = 12;
    const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#ffffff"];

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      trail.push(new TrailPoint(e.clientX, e.clientY));
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        sparkles.push(new Sparkle(e.clientX, e.clientY, color));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update Trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i];
        point.life -= TRAIL_DECAY;
        if (point.life <= 0) trail.splice(i, 1);
      }

      // Draw Trail
      if (trail.length > 1) {
        for (let i = 0; i < trail.length - 1; i++) {
          const point = trail[i];
          const nextPoint = trail[i + 1];

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);

          ctx.shadowBlur = 10;
          ctx.shadowColor = "#3b82f6";
          ctx.lineWidth = TRAIL_WIDTH * point.life;
          ctx.strokeStyle = `rgba(59, 130, 246, ${point.life})`;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.lineWidth = TRAIL_WIDTH * 0.5 * point.life;
          ctx.strokeStyle = `rgba(255, 255, 255, ${point.life})`;
          ctx.stroke();
        }
      }

      // Update & Draw Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.update();
        p.draw(ctx);
        if (p.life >= p.maxLife) sparkles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // z-50 ensures the cursor trail renders above everything else
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
