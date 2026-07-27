import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  const skills: string[] = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript/TypeScript",
    "Kotlin",
    "FastAPI",
    "React",
    "Next.js",
    "NumPy",
    "JAX",
    "PyTorch",
    "TensorFlow",
    "scikit-learn",
    "Langchain",
    "RAG",
    "Fine-tuning",
    "Monte Carlo",
    "Stochastic Modeling",
    "Docker",
    "Kubernetes",
    "Amazon Web Services",
    "Azure",
    "Google Cloud Platform",
  ];

  const interests: string[] = [
    "AI/Machine Learning",
    "Startups and Venture Capital",
    "FinTech",
    "Markets",
    "Philosophy",
    "Product Design and UX",
    "Robotics and Automation",
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const chipClass =
    "px-3 py-1.5 rounded-full border border-border bg-card text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground";

  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden border-t border-border/20">
      <div className="section relative">
        <h2 className="section-title">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              <p>
                I'm a Computer Science student at Georgia Tech, and I'm from Hong Kong.
                I started experimenting with tech when I was younger, mostly out of curiosity,
                and eventually realised I liked the process of turning vague ideas into things 
                that solve problems for people.
              </p>
              <p>
                Since then, I've worked across software, AI, product, and startups, 
                but the technology itself is rarely the most interesting part to me. 
                I'm more interested in what it enables; how products change behaviour, 
                how companies make decisions, and how new tools reshape the way we work 
                and live. I also spend a lot of time learning about markets and philosophy.
              </p>
              <p>
                Outside of work, I’m usually playing the guitar, testing out new recipes, 
                watching movies or going on a new hiking trail with friends and family.
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

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wide text-muted-foreground mb-4">
              Technical Skills
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2.5"
            >
              {skills.map((skill) => (
                <motion.span key={skill} variants={chipVariants} className={chipClass}>
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <h3 className="text-lg font-semibold uppercase tracking-wide text-muted-foreground mt-10 mb-4">
              Other Interests
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2.5"
            >
              {interests.map((interest) => (
                <motion.span key={interest} variants={chipVariants} className={chipClass}>
                  {interest}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
