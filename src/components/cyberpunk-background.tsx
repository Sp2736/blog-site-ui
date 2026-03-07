import React, { useEffect, useRef } from "react";

export default function CyberpunkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;
    const speed = 2.5;
    const gridSpacing = 60;

    const particles: { x: number; y: number; z: number; color: string }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: Math.random() * -500,
        z: Math.random() * 1000 + 100,
        color: Math.random() > 0.5 ? "#06b6d4" : "#ec4899",
      });
    }

    // Distant skyline heights
    const skyline: number[] = [];
    for (let i = 0; i < 100; i++) skyline.push(Math.random() * 80 + 20);

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const render = () => {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const horizonY = canvas.height * 0.45;
      const fov = 300;

      // Retro Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, horizonY, 150, 0, Math.PI * 2);
      const sunGrad = ctx.createLinearGradient(
        0,
        horizonY - 150,
        0,
        horizonY + 150,
      );
      sunGrad.addColorStop(0, "#facc15"); // Bright Yellow
      sunGrad.addColorStop(0.5, "#ec4899"); // Hot Pink
      sunGrad.addColorStop(1, "#4c1d95"); // Deep Purple
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun Grid Cuts (Horizontal black lines across the sun)
      ctx.fillStyle = "#09090b";
      for (let i = 0; i < 8; i++) {
        ctx.fillRect(
          canvas.width / 2 - 160,
          horizonY + i * 15 - 10,
          320,
          4 + i,
        );
      }

      // Horizon Glow
      const glow = ctx.createLinearGradient(
        0,
        horizonY - 50,
        0,
        horizonY + 150,
      );
      glow.addColorStop(0, "rgba(236, 72, 153, 0)");
      glow.addColorStop(0.5, "rgba(236, 72, 153, 0.3)");
      glow.addColorStop(1, "rgba(9, 9, 11, 1)");
      ctx.fillStyle = glow;
      ctx.fillRect(
        0,
        horizonY - 50,
        canvas.width,
        canvas.height - horizonY + 50,
      );

      // Skyline Silhouette
      ctx.fillStyle = "#050505";
      const buildingWidth = canvas.width / 50;
      skyline.forEach((height, i) => {
        ctx.fillRect(
          i * buildingWidth,
          horizonY - height,
          buildingWidth + 1,
          height,
        );
      });

      // Background Lasers
      if (Math.random() > 0.95) {
        ctx.fillStyle = Math.random() > 0.5 ? "#06b6d4" : "#ec4899";
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * (horizonY - 100),
          Math.random() * 200 + 100,
          2,
        );
      }

      // 3D Perspective Grid
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.7)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#06b6d4";

      ctx.beginPath();
      for (let x = -2000; x <= 2000; x += gridSpacing * 2) {
        const startX = canvas.width / 2 + (x * fov) / 1000;
        const endX = canvas.width / 2 + (x * fov) / 100;
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, canvas.height);
      }
      ctx.stroke();

      offset = (offset + speed) % gridSpacing;
      ctx.beginPath();
      for (let z = 100; z <= 1000; z += gridSpacing) {
        const currentZ = z - offset;
        if (currentZ < 10) continue;
        const y = horizonY + (fov * 200) / currentZ;
        if (y > canvas.height) continue;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Floating Geometry
      particles.forEach((p) => {
        p.z -= speed * 2;
        if (p.z < 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = Math.random() * -500;
        }

        const scale = fov / p.z;
        const px = canvas.width / 2 + p.x * scale;
        const py = horizonY + p.y * scale;
        const size = 15 * scale;

        if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
          ctx.strokeStyle = p.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.lineWidth = 2 * scale;
          ctx.beginPath();
          ctx.moveTo(px - size, py);
          ctx.lineTo(px + size, py);
          ctx.moveTo(px, py - size);
          ctx.lineTo(px, py + size);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

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
