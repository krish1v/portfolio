
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, ExternalLink, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center pt-20">
      <div className="section mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-blue font-semibold animate-fade-in">
                Hi there, I'm
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "200ms" }}>
                <span className="block">John Doe</span>
                <span className="text-gradient">CS Student & Builder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "400ms" }}>
                I build exceptional digital experiences with a focus on accessibility and performance.
              </p>

              <div className="flex flex-wrap gap-4 mt-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <Button 
                  className="bg-gradient-to-r from-blue to-purple hover:from-blue-dark hover:to-purple-dark button-glow hover:scale-[1.02] transition-all duration-300" 
                  size="lg" 
                  asChild
                >
                  <a href="#projects">
                    View my work
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="button-glow hover:bg-blue/5 hover:text-blue border-blue/20 hover:border-blue/50"
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-1 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 mt-6 animate-fade-in" style={{ animationDelay: "800ms" }}>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue to-purple rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 border-2 border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 to-purple/10"></div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1024"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
