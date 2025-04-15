
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, ExternalLink, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center pt-20">
      <div className="section mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <p className="text-blue-DEFAULT font-semibold animate-fade-in">
                Hi there, I'm
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "200ms" }}>
                <span className="block">John Doe</span>
                <span className="text-gradient">CS Student & Builder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
                I build exceptional digital experiences with a focus on accessibility and performance.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <Button 
                  className="bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT hover:from-blue-dark hover:to-purple-dark transition-all duration-300 group shadow-lg shadow-blue-DEFAULT/10 hover:shadow-blue-DEFAULT/20"
                  size="lg" 
                  asChild
                >
                  <a href="#projects" className="relative overflow-hidden group">
                    <span className="relative z-10">View my work</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute bottom-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-dark to-purple-dark transition-opacity duration-300 -z-10"></span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="border-blue-DEFAULT/20 hover:bg-blue-DEFAULT/10 button-glow"
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group">
                    <Download className="mr-1 h-4 w-4 group-hover:text-blue-DEFAULT transition-colors duration-300" />
                    <span className="group-hover:text-blue-DEFAULT transition-colors duration-300">Resume</span>
                  </a>
                </Button>
              </div>

              <div className="flex justify-center md:justify-start gap-4 mt-6 animate-fade-in" style={{ animationDelay: "800ms" }}>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-DEFAULT transition-colors duration-300 hover:scale-110 transform"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-DEFAULT transition-colors duration-300 hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 border-2 border-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-DEFAULT/10 to-purple-DEFAULT/10"></div>
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
