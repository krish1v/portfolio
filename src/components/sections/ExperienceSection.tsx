import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
  skills?: string[];
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Software Engineer, AI",
      company: "Global Futures and Options Ltd (GFO-X)",
      period: "May 2025 - July 2025",
      description: "Worked on AI-driven solutions within Europe’s first regulated digital asset derivatives exchange. Built a retrieval-augmented generation (RAG) engine with a self hosted vLLM, LangChain, and PyTorch, achieving >90% across RAGAS metrics for Jira/Confluence agents. Developed a Confluence scraper and document classifier, ingesting 1,000+ pages into PostgreSQL for fast semantic search and knowledge retrieval. Designed a ReAct-based multi-agent system to handle gap analysis, automated ticket creation, progress tracking, and sentiment monitoring. Reduced QA time by 70% with automated testing and shipped a production-ready PoC in under two months, enabling 5+ business units including infrastructure, market ops, quant, and compliance to pilot AI workflows.",
      type: "work",
      skills: ["Python", "FastAPI", "LangChain", "PyTorch", "PostgreSQL", "ReAct", "RAGAS", "Asyncio", "Docker", "Git"]
    },
    {
      id: 2,
      title: "Bachelor of Science in Computer Engineering",
      company: "Georgia Institute of Technology",
      period: "Aug 2024 - Present",
      description: "Concentration in Artificial Intelligence and People with a minor in Business. Maintaining a 4.0 GPA while building startups, participating in hackathons, and being a part of clubs like Startup Exchange, Venture Capital Club, and Trading@GT.",
      type: "education"
    },
    {
      id: 3,
      title: "Product Development Intern",
      company: "FundFluent Limited.",
      period: "Jun 2023 - Aug 2023",
      description: "Worked across AI, data, and strategy at a VC-backed startup helping SMEs raise $20M+. Developed an SEO pipeline with LLMs, analyzed product usage to guide v2 launch, and pitched the roadmap to win HKU’s Most Outstanding Student Prize.",
      type: "work",
      skills: ["Python", "SQL", "Data Analysis", "Strategy"]
    },
    {
      id: 4,
      title: "Research Assistant",
      company: "The Hong Kong Polytechnic University",
      period: "Apr 2023 - Aug 2023",
      description: "Conducted research on proton-exchange membrane fuel cells (PEMFC) as part of a competitive PolyU reseach program. Built and tested a model car powered by a passive fuel cell stack to evaluate performance and sustainability impact.",
      type: "work",
      skills: ["Engineering Research", "Fuel Cell", "Modeling", "Prototype Testing"]
    },
    {
      id: 5,
      title: "High School Diploma",
      company: "West Island School",
      period: "Aug 2017 - May 2024",
      description: "Graduated with International Baccalaureate Diploma (Score: 44), ACT: 35. Head Student · Founder, Young Entrepreneurs Club · Debate · Physics & Econ Olympiads · Volleyball · Service & Leadership (Kids4Kids, Borneo, Diwali Ball)",
      type: "education"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            if (!visibleItems.includes(id)) {
              setVisibleItems(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [visibleItems]);

  return (
    <section id="experience" className="relative py-20 md:py-24 border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.03),transparent_50%)]" />
      </div>
      <div className="section relative">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          My professional journey and educational background in the world of technology.
        </p>

        <div className="mt-12 relative max-w-[1400px] mx-auto" ref={timelineRef}>
          {/* Timeline stem - centered and adjusted for wider layout */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue/30 via-blue/20 to-border transform md:-translate-x-1/2 z-0"></div>

          {/* Timeline items */}
          <div className="space-y-16 relative z-10">
            {experiences.map((item, index) => (
              <div
                key={item.id}
                data-id={item.id}
                className={`timeline-item transition-all duration-700 ${
                  index % 2 === 0 
                    ? "md:flex-row-reverse timeline-right" 
                    : "timeline-left"
                } flex flex-col md:flex-row gap-8 opacity-0 translate-y-8`}
                style={{ 
                  opacity: visibleItems.includes(item.id) ? 1 : 0,
                  transform: visibleItems.includes(item.id) ? 'translateY(0)' : 'translateY(2rem)',
                  transitionDelay: `${(visibleItems.indexOf(item.id) * 150)}ms` 
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-6px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-blue to-blue/80 flex items-center justify-center z-10 shadow-lg shadow-blue/25 mt-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-background"></div>
                </div>

                {/* Content - wider cards */}
                <div className="w-full md:w-[calc(50%-1.5rem)] ml-8 md:ml-0">
                  <div className="relative group">
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue/[0.02] to-purple/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl hover:shadow-blue/5 hover:border-blue/20">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-blue transition-colors duration-300">{item.title}</h3>
                          <p className="text-muted-foreground font-medium mt-1">{item.company}</p>
                        </div>
                        <span className="bg-muted/50 text-muted-foreground text-xs rounded-full px-3 py-1 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </span>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-5"></div>

                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                      {item.skills && (
                        <div className="flex flex-wrap gap-3 mt-5">
                          {item.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-1.5 rounded-full border border-muted/50 bg-card/60 backdrop-blur-sm text-sm font-medium transition-colors hover:border-blue/40 hover:bg-muted/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
