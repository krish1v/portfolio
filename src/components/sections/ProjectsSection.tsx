
import { useState } from "react";
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

  return (
    <section id="projects" className="py-24">
      <div className="section">
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          Here are some of the projects I've worked on. Each one taught me something new and helped me grow as a developer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card group overflow-hidden"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  {project.liveUrl && (
                    <Button variant="accent" size="sm" className="rounded-full">
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
                    <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  className="w-full mt-4 justify-start p-0 hover:bg-transparent hover:text-highlight"
                >
                  <span>View details</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" asChild>
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
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
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
                        <Code className="h-5 w-5 text-highlight mr-2 mt-0.5 flex-shrink-0" />
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
                      <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 mt-8">
                {selectedProject.liveUrl && (
                  <Button variant="accent" asChild>
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
                  <Button variant="outline" asChild>
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
