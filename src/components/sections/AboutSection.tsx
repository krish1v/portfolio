import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  const skills: string[] = [
    "Python",
    "Java",
    "JavaScript/TypeScript",
    "FastAPI",
    "Node.js",
    "React",
    "Next.js",
    "NumPy",
    "Pandas",
    "Langchain",
    "PyTorch",
    "REST APIs",
    "Supabase",
    "Amazon Web Services",
    "Azure",
    "Google Cloud Platform",
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative py-20 md:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue/5 to-background pointer-events-none" />
      <div className="section relative">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I’m a Computer Science student at Georgia Tech, passionate about building AI driven systems that make a tangible impact. I started experimenting with code at 16, from designing websites to building blockchain projects, and quickly realised my favorite challenge is turning abstract ideas into products people actually use.
              </p>
              <p>
                Today, I’m especially focused on AI applications, intelligent systems, and product-driven development. I’ve built projects ranging from an autonomous delivery robot and AI-powered SEO workflows to a cold outreach automation platform and a risk analysis engine using dynamic knowledge graphs. Whether it’s fintech, edtech, or productivity tools, I’m drawn to problems where AI isn’t just a buzzword but a way to unlock new capabilities and rethink how people interact with technology.              
              </p>
              <p>
                I’m motivated by opportunities where I can move fast, learn deeply, and build things with lasting value, ideally alongside teams that value both technical precision and creative problem-solving.
              </p>
              <p>
                Outside of work, I’m usually playing the guitar, testing out new recipes, or going on a new hiking trail with friends and family.
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
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={chipVariants}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2.5 rounded-full border border-muted/50 bg-card/60 backdrop-blur-sm text-base font-medium transition-colors hover:border-blue/40 hover:bg-muted/50"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Other Interests</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  "AI/Machine Learning",
                  "Startups and Venture Capital",
                  "FinTech",
                  "Markets",
                  "Product Design and UX",
                  "Robotics and Automation",
                ].map((interest) => (
                  <motion.span
                    key={interest}
                    variants={chipVariants}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 rounded-full border border-muted/50 bg-card/60 backdrop-blur-sm text-base font-medium transition-colors hover:border-blue/40 hover:bg-muted/50"
                  >
                    {interest}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
