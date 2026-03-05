import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeEffects } from "./theme-effects";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeEffects />
      {children}
    </NextThemesProvider>
  );
}
