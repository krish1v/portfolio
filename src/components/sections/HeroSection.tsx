
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, ExternalLink, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="min-h-[90vh] flex items-center pt-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Modern gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue/5 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-blue/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '18s' }}></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-40 right-1/4 w-72 h-32 bg-gradient-to-br from-purple/10 to-transparent rounded-full rotate-45 blur-3xl opacity-10 animate-pulse" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-gradient-to-tr from-blue/10 to-transparent rounded-full rotate-12 blur-3xl opacity-15 animate-pulse" style={{ animationDuration: '22s' }}></div>
        
        {/* Subtle noise texture */}
        <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIyMjIyMjEwIiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      </div>
      
      <div className="section mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-blue font-semibold animate-fade-in">
                Hi there, I'm
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "200ms" }}>
                <span className="block">Krishiv Khatri</span>
                <span className="text-gradient">CS Student & Builder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "400ms" }}>
                I build exceptional digital experiences with a focus on accessibility and performance.
              </p>

              <div className="flex flex-wrap gap-4 mt-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <Button 
                  className="bg-gradient-to-r from-blue to-purple hover:from-blue-dark hover:to-purple-dark button-glow hover:scale-[1.02] transition-all duration-300 text-white" 
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

          <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
            <div className="relative animate-fade-in md:translate-x-[-5%]" style={{ animationDelay: "300ms" }}>
              {/* More subtle, transparent and blurred gradient shadow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue/30 to-purple/30 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden h-72 w-72 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-purple/5"></div>
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
