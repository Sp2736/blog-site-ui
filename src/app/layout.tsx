import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers"; // Read cookies on the server

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: {
    default: "Wander-n-Wonder | Swayam Patel",
    template: "%s | Wander-n-Wonder",
  },
  description:
    "A premium digital space and personal blog exploring software development, tech, algorithms, and university diaries.",
  keywords: [
    "Swayam Patel",
    "Wander-n-Wonder",
    "Software Engineering",
    "Web Development",
    "Tech Blog",
    "Charusat University Student Blog",
    "Charusat Students",
    "Depstar Blogs",
  ],
  authors: [{ name: "Swayam Patel" }],
  creator: "Swayam Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wander-n-wonder.vercel.app",
    title: "Wander-n-Wonder",
    description:
      "A premium digital space exploring tech, code, and late-night thoughts.",
    siteName: "Wander-n-Wonder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wander-n-Wonder | Swayam Patel",
    description:
      "A premium digital space exploring tech, code, and late-night thoughts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SECURE SERVER-SIDE CHECK
  // It checks against an environment variable first, but falls back to string just in case there's no .env
  // Hence prohibit client-side from allowing to read cookies at all
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  const isAdmin = !!(token && token === process.env.ADMIN_SECRET);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontBody.variable} ${fontHeadline.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark", "cyberpunk", "groovy", "cosmic"]}
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full">
            {/* Pass the result directly to the header */}
            <Header isAdmin={isAdmin} />
            <main>{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
