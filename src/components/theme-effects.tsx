"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import BackgroundMeteors from "./background-meteors";
import MeteorCursor from "./meteor-cursor";
import CyberpunkBackground from "./cyberpunk-background";
import GroovyBackground from "./groovy-background";
import DarkBackground from "./dark-background";
import LightBackground from "./light-background";

function ElegantCursors({ themeName }: { themeName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const mouse = { x: -100, y: -100 };
    const trails: any[] = [];
    const clickEffects: any[] = [];

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (themeName === "cyberpunk") {
        trails.push({ x: mouse.x, y: mouse.y, life: 1, isTrail: true });
      } else if (themeName === "groovy") {
        trails.push({ x: mouse.x, y: mouse.y, life: 1, isTrail: true });
        if (Math.random() > 0.85) {
          trails.push({
            x: mouse.x + (Math.random() - 0.5) * 10,
            y: mouse.y + (Math.random() - 0.5) * 10,
            life: 1,
            size: Math.random() * 3 + 1,
            isDrip: true,
          });
        }
      } else if (themeName === "dark") {
        trails.push({
          x: mouse.x,
          y: mouse.y,
          life: 1,
          size: Math.random() * 2 + 1,
        });
      } else if (themeName === "light") {
        trails.push({ x: mouse.x, y: mouse.y, life: 1 });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (themeName === "light") {
        clickEffects.push({
          type: "ripple",
          x: e.clientX,
          y: e.clientY,
          life: 1,
          radius: 0,
        });
      } else if (themeName === "dark") {
        for (let i = 0; i < 8; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          clickEffects.push({
            type: "shatter",
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            size: Math.random() * 5 + 2,
            rot: Math.random() * Math.PI,
          });
        }
      } else if (themeName === "cyberpunk") {
        for (let i = 0; i < 12; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 4;
          clickEffects.push({
            type: "glitchShatter",
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            size: Math.random() * 8 + 4,
            color: Math.random() > 0.5 ? "#06b6d4" : "#39ff14",
          });
        }
      } else if (themeName === "groovy") {
        for (let i = 0; i < 8; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 20;
          clickEffects.push({
            type: "splatter",
            x: e.clientX + Math.cos(angle) * dist,
            y: e.clientY + Math.sin(angle) * dist,
            life: 1,
            size: Math.random() * 6 + 2,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render the cursor trails
      if (themeName === "cyberpunk") {
        const path = trails.filter((t) => t.isTrail);
        if (path.length > 1) {
          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
          for (let i = 0; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
            path[i].life -= 0.05;
          }
          ctx.lineCap = "round";

          ctx.shadowBlur = 30;
          ctx.shadowColor = "#39ff14";
          ctx.strokeStyle = `rgba(57, 255, 20, 0.5)`;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ffffff";
          ctx.strokeStyle = `rgba(255, 255, 255, 0.9)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.shadowBlur = 0;
        }
        while (trails.length > 0 && trails[0].life <= 0) trails.shift();

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(mouse.x - 8, mouse.y - 1, 16, 2);
        ctx.fillRect(mouse.x - 1, mouse.y - 8, 2, 16);
      } else if (themeName === "groovy") {
        const path = trails.filter((t) => t.isTrail);
        if (path.length > 1) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          // Draw segment by segment with individual fading opacity
          for (let i = 0; i < path.length - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(path[i].x, path[i].y);
            ctx.lineTo(path[i + 1].x, path[i + 1].y);
            // The older the point, the lower the opacity
            ctx.strokeStyle = `rgba(20, 10, 5, ${Math.max(0, path[i].life * 0.7)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            path[i].life -= 0.015;
          }
          path[path.length - 1].life -= 0.015;
        }

        const drips = trails.filter((t) => t.isDrip);
        for (let i = drips.length - 1; i >= 0; i--) {
          drips[i].life -= 0.008;
          const radius = Math.max(0, drips[i].size * drips[i].life);
          ctx.beginPath();
          ctx.arc(drips[i].x, drips[i].y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(30, 15, 5, ${Math.max(0, drips[i].life)})`;
          ctx.fill();
        }

        while (trails.length > 0 && trails[0].life <= 0) trails.shift();

        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(mouse.x + 8, mouse.y + 12);
        ctx.lineTo(mouse.x - 4, mouse.y + 10);
        ctx.fillStyle = "rgba(20, 10, 5, 1)";
        ctx.fill();
      } else if (themeName === "light") {
        for (let i = trails.length - 1; i >= 0; i--) {
          trails[i].life -= 0.04;
          if (trails[i].life <= 0) {
            trails.splice(i, 1);
            continue;
          }
          const radius = Math.max(0, 25 * (1 - trails[i].life));
          ctx.beginPath();
          ctx.arc(trails[i].x, trails[i].y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.max(0, trails[i].life * 0.1)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
        ctx.fill();
      } else if (themeName === "dark") {
        for (let i = trails.length - 1; i >= 0; i--) {
          trails[i].life -= 0.05;
          if (trails[i].life <= 0) {
            trails.splice(i, 1);
            continue;
          }
          const radius = Math.max(0, trails[i].size * trails[i].life);
          ctx.beginPath();
          ctx.arc(trails[i].x, trails[i].y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, trails[i].life)})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ffffff";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Rendering the click effects
      for (let i = clickEffects.length - 1; i >= 0; i--) {
        const p = clickEffects[i];

        if (p.type === "ripple") {
          p.radius += 2;
          p.life -= 0.03;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0, p.radius), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${Math.max(0, p.life)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          if (p.life <= 0) clickEffects.splice(i, 1);
        } else if (p.type === "shatter") {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          p.rot += 0.1;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.life)})`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
          if (p.life <= 0) clickEffects.splice(i, 1);
        } else if (p.type === "glitchShatter") {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.06;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.fillStyle = `${p.color}${Math.floor(Math.max(0, p.life) * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size * p.life,
            p.size * p.life,
          );
          ctx.restore();
          if (p.life <= 0) clickEffects.splice(i, 1);
        } else if (p.type === "splatter") {
          p.life -= 0.005;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(30, 15, 5, ${Math.max(0, p.life)})`;
          ctx.fill();
          if (p.life <= 0) clickEffects.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [themeName]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export function ThemeEffects() {
  const { theme, resolvedTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  useEffect(() => {
    setActiveTheme(null);
    const timer = setTimeout(
      () => setActiveTheme(theme === "system" ? resolvedTheme! : theme!),
      50,
    );
    return () => clearTimeout(timer);
  }, [theme, resolvedTheme]);

  if (!activeTheme) return null;

  return (
    <div key={activeTheme} className="pointer-events-none">
      {activeTheme === "cosmic" ? (
        <>
          <BackgroundMeteors />
          <MeteorCursor />
        </>
      ) : (
        <>
          {activeTheme === "cyberpunk" && <CyberpunkBackground />}
          {activeTheme === "groovy" && <GroovyBackground />}
          {activeTheme === "dark" && <DarkBackground />}
          {activeTheme === "light" && <LightBackground />}
          <ElegantCursors themeName={activeTheme} />
        </>
      )}
    </div>
  );
}
