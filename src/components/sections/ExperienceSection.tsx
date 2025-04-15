
import { useEffect, useRef, useState } from "react";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";

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
      company: "Tech Innovations Inc.",
      period: "Jun 2023 - Aug 2023",
      description: "Developed new features for the company's flagship product, improving user engagement by 15%. Collaborated with designers and product managers to implement responsive UI components.",
      type: "work",
      skills: ["React", "TypeScript", "REST APIs"]
    },
    {
      id: 2,
      title: "Bachelor of Science in Computer Science",
      company: "University of Technology",
      period: "Sep 2020 - Present",
      description: "Focusing on artificial intelligence and web technologies. Maintaining a 3.8 GPA while participating in hackathons and coding competitions.",
      type: "education"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupHub",
      period: "Oct 2022 - Mar 2023",
      description: "Worked with a team of developers to build an early-stage startup's web application. Implemented authentication flows, dashboard interfaces, and data visualization components.",
      type: "work",
      skills: ["JavaScript", "React", "TailwindCSS", "Firebase"]
    },
    {
      id: 4,
      title: "Research Assistant",
      company: "AI Lab, University of Technology",
      period: "Jan 2022 - May 2022",
      description: "Assisted in developing machine learning models for natural language processing tasks. Collected and preprocessed data, trained models, and evaluated results.",
      type: "work",
      skills: ["Python", "PyTorch", "NLP", "Data Analysis"]
    },
    {
      id: 5,
      title: "High School Diploma",
      company: "Westlake High School",
      period: "Sep 2016 - Jun 2020",
      description: "Graduated with honors. Participated in robotics club and math competitions.",
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
    <section id="experience" className="py-24 bg-gradient-to-b from-background to-background/70 dark:from-background dark:to-background/90">
      <div className="section">
        <h2 className="section-title">Experience</h2>
        <p className="text-muted-foreground max-w-2xl mt-4">
          My professional journey and educational background in the world of technology.
        </p>

        <div className="mt-16 relative" ref={timelineRef}>
          {/* Timeline stem */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue via-blue/70 to-blue/20 transform md:-translate-x-1/2 z-0"></div>

          {/* Timeline items */}
          <div className="space-y-12 relative z-10">
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
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-blue/20 to-purple/20 backdrop-blur-sm flex items-center justify-center z-10 shadow-md">
                  {item.type === "work" ? (
                    <Briefcase className="h-4 w-4 text-blue" />
                  ) : (
                    <GraduationCap className="h-4 w-4 text-blue" />
                  )}
                </div>

                {/* Content */}
                <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="card p-6 h-full hover:shadow-lg hover:shadow-blue/10 backdrop-blur-sm bg-card/80 dark:bg-card/50 border-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.company}</p>
                      </div>
                      <span className="bg-gradient-to-r from-blue/10 to-purple/10 text-blue text-xs rounded-full px-3 py-1 flex items-center gap-1 whitespace-nowrap backdrop-blur-sm">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                    </div>

                    <p className="mt-4 text-muted-foreground">{item.description}</p>

                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.skills.map((skill) => (
                          <span key={skill} className="text-xs px-2 py-1 bg-blue/10 text-blue rounded-full backdrop-blur-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
