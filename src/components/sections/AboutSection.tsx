
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
}

export function AboutSection() {
  const techSkills: Skill[] = [
    { name: "JavaScript / TypeScript", percentage: 90 },
    { name: "React / React Native", percentage: 85 },
    { name: "Node.js / Express", percentage: 80 },
    { name: "Python", percentage: 75 },
    { name: "UI/UX Design", percentage: 70 },
  ];

  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars when they come into view
            const skillBars = entry.target.querySelectorAll(".skill-progress");
            skillBars.forEach((bar, index) => {
              const skill = techSkills[index];
              setTimeout(() => {
                (bar as HTMLElement).style.width = `${skill.percentage}%`;
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [techSkills]);

  return (
    <section id="about" className="bg-muted/30 dark:bg-muted/10 py-24">
      <div className="section">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a Computer Science student and software developer with a passion for building products that solve real problems. My journey in tech started when I built my first website at 15, and I've been hooked ever since.
              </p>
              <p>
                Currently, I'm focusing on AI applications and web development, with a particular interest in creating accessible and performant user experiences. I'm also exploring the intersection of technology and education.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains, reading science fiction, or experimenting with new recipes in the kitchen.
              </p>
            </div>
            
            <div className="mt-8">
              <Button variant="outline" asChild>
                <a href="#experience">
                  View my experience
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          <div ref={skillsRef}>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {techSkills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-highlight font-mono">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress w-0" style={{ transitionDelay: `${index * 0.1}s` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Other Interests</h3>
              <div className="flex flex-wrap gap-2">
                {["AI Ethics", "UX Research", "Data Visualization", "Technical Writing", "Open Source"].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-muted rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
