import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wander-n-wonder.vercel.app"),
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
            <Header />
            <main>{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
        <Footer/>
      </body>
    </html>
  );
}
