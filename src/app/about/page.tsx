import Link from "next/link";
import { ArrowLeft, Github, Mail, Code2, Layers, Instagram, Linkedin } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-background text-foreground">
      
      {/* Uses semantic primary colors to match current theme */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Main Card: Uses bg-card and backdrop-blur to adapt perfectly to any theme */}
      <div className="relative w-full max-w-4xl bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden z-10 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-border/50 mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-medium tracking-tight">Back to Feed</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Left Column: Profile & Contact */}
          <div className="space-y-6">
            <div className="aspect-square w-full max-w-[250px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-border/50 bg-card/50 flex items-center justify-center shadow-inner relative">
              {/* Fetches live GitHub profile picture */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://github.com/Sp2736.png" 
                alt="Swayam Patel" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold font-space-grotesk tracking-tight text-foreground">Swayam Patel</h1>
              <p className="text-muted-foreground font-medium">A Confused Tech Enthusiast</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2 flex-wrap">
              <a href="https://github.com/Sp2736" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 border border-border/50 transition-colors text-muted-foreground hover:text-primary">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/swayam-patel-316ba5317" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 border border-border/50 transition-colors text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/sp_27.03" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-card hover:bg-primary/20 border border-border/50 transition-colors text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="mailto:swayampatel2736@gmail.com" className="p-3 rounded-full bg-card hover:bg-primary/20 border border-border/50 transition-colors text-muted-foreground hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Tech Stack */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Code2 className="text-primary" size={24} /> Brief Introduction? Sure!
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>
                  Hello! I'm Swayam, a developer passionate about bridging the gap between complex algorithms and beautiful, intuitive user interfaces. Wander-n-Wonder is my digital garden where I document my university experiences, deep dives into tech, and occasional hot takes.
                </p>
                <p>
                  Whether I'm setting up my Ubuntu workspace, diving into Burp Suite and Wireshark and practicing on DVWA, or exploring the intricacies of Data Mining, I love figuring out how things work under the hood. When I'm not coding, you can usually find me tuning into the latest tech talks, breaking and re-building myself at the gym, or drowning in a nice Iced Americano.
                </p>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-border/50">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Layers className="text-primary" size={24} /> Tech Stack for Wander-n-Wonder
              </h2>
              <div className="flex flex-wrap gap-2">
                {/* Updated to reflect the actual tech stack of this project */}
                {[
                  "Next.js App Router", 
                  "React", 
                  "TypeScript", 
                  "PostgreSQL", 
                  "Prisma ORM", 
                  "Tailwind CSS", 
                  "Framer Motion", 
                  "Lucide Icons", 
                  "Vercel"
                ].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-default shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}