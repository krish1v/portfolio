import { useEffect, useRef, useState } from "react";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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
      title: "Software Engineering Intern",
      company: "Global Futures and Options Ltd (GFO-X)",
      period: "Jun 2023 - Aug 2023",
      description: "Developed new features for the company's flagship product, improving user engagement by 15%. Collaborated with designers and product managers to implement responsive UI components.",
      type: "work",
      skills: ["React", "TypeScript", "REST APIs"]
    },
    {
      id: 2,
      title: "Bachelor of Science in Computer Engineering",
      company: "Georgia Institute of Technology",
      period: "Aug 2024 - Present",
      description: "Concentration in Distributed Systems and Software Design and Information Internetworks with a minor in Business. Maintaining a 4.0 GPA while building startups, participating in hackathons, and being a part of clubs like Startup Exchange, Venture Capital Club, and Trading@GT.",
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
    <section id="experience" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]" />
      </div>
      <div className="section relative">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          My professional journey and educational background in the world of technology.
        </p>

        <div className="mt-16 relative max-w-[1400px] mx-auto" ref={timelineRef}>
          {/* Timeline stem - centered and adjusted for wider layout */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue/40 via-blue/30 to-blue/10 transform md:-translate-x-1/2 z-0"></div>

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
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-blue to-purple backdrop-blur-sm flex items-center justify-center z-10 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-background"></div>
                </div>

                {/* Content - wider cards */}
                <div className="w-full md:w-[calc(50%-2rem)] min-w-[500px]">
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div className="backdrop-blur-sm bg-transparent dark:bg-transparent pb-8 border-0 rounded-xl transition-all duration-300 
                          hover:translate-y-[-4px] group relative overflow-hidden w-full
                          before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-blue/5 before:to-purple/5 
                          hover:before:from-blue/10 hover:before:to-purple/10 before:transition-all before:duration-500
                          hover:shadow-lg hover:shadow-blue/5 dark:hover:shadow-blue/10">
                        <div className="relative z-10 p-6 md:p-8">
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold group-hover:text-blue transition-colors duration-300">{item.title}</h3>
                              <p className="text-muted-foreground">{item.company}</p>
                            </div>
                            <span className="bg-gradient-to-r from-blue/5 to-purple/5 text-blue text-xs rounded-full px-3 py-1.5 flex items-center gap-1 whitespace-nowrap backdrop-blur-sm">
                              <Calendar className="h-3 w-3" />
                              {item.period}
                            </span>
                          </div>

                          <div className="h-px w-full bg-gradient-to-r from-blue/10 to-purple/10 my-3 opacity-70 
                              group-hover:from-blue/20 group-hover:to-purple/20 transition-all duration-300"></div>

                          <p className="mt-3 text-muted-foreground">{item.description}</p>

                          {item.skills && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.skills.map((skill) => (
                                <span key={skill} className="text-xs px-2.5 py-1 bg-gradient-to-r from-blue/10 to-purple/10 
                                    text-blue rounded-full backdrop-blur-sm group-hover:from-blue/15 group-hover:to-purple/15 
                                    transition-all duration-300">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="backdrop-blur-lg bg-background/50 border border-blue/10 p-4 w-80">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {item.type === "work" ? (
                            <Briefcase className="h-4 w-4 text-blue" />
                          ) : (
                            <GraduationCap className="h-4 w-4 text-purple" />
                          )}
                          <h4 className="text-sm font-medium">{item.type === "work" ? "Work Experience" : "Education"}</h4>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-blue/10 to-purple/10"></div>
                        <p className="text-xs text-muted-foreground">
                          {item.type === "work" 
                            ? "Click to view more details about this role and projects"
                            : "Click to view more details about this educational experience"}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
