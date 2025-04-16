import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, Globe, ExternalLink, Code, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  features?: string[];
  technologies?: string[];
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Study Assistant",
      description: "An AI-powered study tool that helps students organize notes and prepare for exams.",
      tags: ["React", "Node.js", "OpenAI API"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1024",
      liveUrl: "https://example.com/project1",
      githubUrl: "https://github.com/username/project1",
      detailedDescription: "The AI Study Assistant is designed to help students organize their study materials and prepare for exams more efficiently. It uses natural language processing to analyze notes, create study guides, and generate practice questions.",
      features: [
        "Smart note organization with tagging and search",
        "AI-generated study guides based on your notes",
        "Custom quiz generation for exam preparation",
        "Spaced repetition system for better retention"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "JWT Authentication"]
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, cart functionality, and payment processing.",
      tags: ["Next.js", "TypeScript", "Stripe"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1024",
      liveUrl: "https://example.com/project2",
      githubUrl: "https://github.com/username/project2",
      detailedDescription: "This e-commerce platform provides a complete solution for online stores, featuring a responsive product catalog, shopping cart functionality, secure checkout, and admin dashboard.",
      features: [
        "Responsive product catalog with filtering and search",
        "User authentication and profile management",
        "Shopping cart with persistent storage",
        "Secure checkout with Stripe integration",
        "Admin dashboard for product and order management"
      ],
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Stripe API"]
    },
    {
      id: 3,
      title: "Climate Data Visualization",
      description: "Interactive data visualization tool for climate data, helping users understand environmental trends.",
      tags: ["D3.js", "React", "Python"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1024",
      liveUrl: "https://example.com/project3",
      githubUrl: "https://github.com/username/project3",
      detailedDescription: "This visualization tool transforms complex climate data into intuitive, interactive charts and maps, making environmental trends more accessible to the general public.",
      features: [
        "Interactive time-series visualizations of temperature and precipitation",
        "Global and regional map views with selectable data layers",
        "Comparison tools to analyze historical trends",
        "Data export functionality for researchers"
      ],
      technologies: ["React", "D3.js", "Python", "Flask", "Pandas", "GeoJSON"]
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove('opacity-0');
              entry.target.classList.remove('translate-y-10');
              entry.target.classList.add('opacity-100');
              entry.target.classList.add('translate-y-0');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple/5 to-background" />
      <div className="section relative" ref={projectsRef}>
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          Here are some of the projects I've worked on. Each one taught me something new and helped me grow as a developer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card card card-hover opacity-0 translate-y-10 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                  {project.liveUrl && (
                    <Button 
                      variant="accent" 
                      size="sm" 
                      className="rounded-full bg-blue hover:bg-blue-dark button-glow"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">Live Site</span>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="secondary" size="sm" className="rounded-full">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-blue/10 text-blue rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  className="w-full mt-4 justify-start p-0 hover:bg-transparent hover:text-blue group"
                >
                  <span>View details</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="button-glow hover:bg-blue/5 hover:text-blue border-blue/20 hover:border-blue/50"
            asChild
          >
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View more on GitHub
            </a>
          </Button>
        </div>
      </div>
      
      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="sm:max-w-3xl backdrop-blur-xl bg-card/60 border-white/10">
            <DialogHeader>
              <DialogTitle className="text-gradient">{selectedProject.title}</DialogTitle>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-md"
              />
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold">Overview</h4>
                <p className="mt-2 text-muted-foreground">
                  {selectedProject.detailedDescription}
                </p>
              </div>
              
              {selectedProject.features && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Key Features</h4>
                  <ul className="mt-2 space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Code className="h-5 w-5 text-blue mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedProject.technologies && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue/10 text-blue rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-8">
                {selectedProject.liveUrl && (
                  <Button 
                    variant="accent" 
                    className="bg-gradient-to-r from-blue to-purple button-glow hover:from-blue-dark hover:to-purple-dark"
                    asChild
                  >
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Live Site
                    </a>
                  </Button>
                )}
                
                {selectedProject.githubUrl && (
                  <Button 
                    variant="outline" 
                    className="button-glow hover:bg-blue/5 hover:text-blue border-blue/20 hover:border-blue/50"
                    asChild
                  >
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
