import { useTheme } from "@/hooks/use-theme-engine";
import BackgroundMeteors from "./background-meteors";
import LightBackground from "./light-background";
import DarkBackground from "./dark-background";
import GroovyBackground from "./groovy-background";
import CyberpunkBackground from "./cyberpunk-background";

export default function ThemeEffectLayer() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "light" && <LightBackground />}
      {theme === "dark" && <DarkBackground />}
      {theme === "cyberpunk" && <CyberpunkBackground />}
      {theme === "groovy" && <GroovyBackground />}
      {theme === "cosmic" && <BackgroundMeteors />}
    </>
  );
}
