import React, { useEffect, useRef } from "react";

export default function BackgroundMeteors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const meteors: Meteor[] = [];
    const stars: Star[] = [];

    const STAR_COUNT = 400;
    const METEOR_FREQUENCY = 0.08;
    const COLORS = {
      star: "rgba(255, 255, 255, 0.8)",
      meteorHead: "#ffffff",
      meteorTail: "rgba(59, 130, 246, 1)",
    };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      blinkSpeed: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.blinkSpeed = Math.random() * 0.02;
      }
      update() {
        this.opacity += this.blinkSpeed;
        if (this.opacity > 1 || this.opacity < 0.1) this.blinkSpeed *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      x: number;
      y: number;
      length: number;
      vx: number;
      vy: number;
      constructor() {
        // Massive spread: Spawns far off-screen to the right and top
        this.x = Math.random() * (canvas!.width * 2);
        this.y = Math.random() * -canvas!.height;
        this.length = Math.random() * 120 + 60;
        this.vx = -(Math.random() * 3 + 4); // Speed moving left
        this.vy = Math.random() * 3 + 4; // Speed moving down
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        if (!ctx) return;

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const nx = this.vx / speed;
        const ny = this.vy / speed;

        const tailX = this.x - nx * this.length;
        const tailY = this.y - ny * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, COLORS.meteorHead); // Glowing white head at the very front
        gradient.addColorStop(0.1, COLORS.meteorTail); // Sharp transition to blue
        gradient.addColorStop(1, "transparent"); // Fades into the night

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";
        ctx.shadowBlur = 20;
        ctx.shadowColor = COLORS.meteorTail;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Extra bright core for the head
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      isOutOfBounds() {
        return this.x < -200 || this.y > canvas!.height + 200;
      }
    }

    for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.update();
        s.draw();
      });

      if (Math.random() < METEOR_FREQUENCY) meteors.push(new Meteor());

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.update();
        m.draw();
        if (m.isOutOfBounds()) meteors.splice(i, 1);
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
      className="fixed inset-0 pointer-events-none z-[-1] bg-[#0b0f19]"
    />
  );
}
