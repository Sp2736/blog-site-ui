"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

// The header accepts isAdmin directly from the server layout
export function Header({ isAdmin }: { isAdmin?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">
              Wander-n-Wonder
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {mounted ? (
            <>
              {/* Button renders based on the secure server check */}
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="default" className="relative group">
                    <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    Creator Studio
                  </Button>
                </Link>
              )}

              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mr-4"
              >
                About
              </Link>

              <a
                href="https://github.com/Sp2736/blog-site-ui"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <ThemeToggle />
            </>
          ) : (
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          )}
        </div>
      </div>
    </header>
  );
}
