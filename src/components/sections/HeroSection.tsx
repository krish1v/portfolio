import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, Github, Instagram, Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useRef, useEffect, useState } from "react";

const fadeUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showResume, setShowResume] = useState(false);
  
  // Mouse tracking setup with normalized coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid motion
  const smoothX = useSpring(mouseX, {
    stiffness: 40,
    damping: 30,
    mass: 0.5
  });
  
  const smoothY = useSpring(mouseY, {
    stiffness: 40,
    damping: 30,
    mass: 0.5
  });

  // Transform ranges for different elements
  const moveX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const moveY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const rotateX = useTransform(smoothY, [-1, 1], [2, -2]);
  const rotateY = useTransform(smoothX, [-1, 1], [-2, 2]);

  // Scale transforms for blob elements
  const blobScale = useTransform(
    smoothX,
    [-1, 0, 1],
    [0.95, 1, 0.95]
  );

  // Update mouse position with normalized coordinates
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Convert to normalized coordinates (-1 to 1)
      const x = (event.clientX - rect.left) / rect.width * 2 - 1;
      const y = (event.clientY - rect.top) / rect.height * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    // Smoothly reset to center
    mouseX.set(0);
    mouseY.set(0);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      mouseX.destroy();
      mouseY.destroy();
    };
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-[90vh] flex items-center pt-20 relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive background layer */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          rotateX,
          rotateY,
          perspective: "1000px"
        }}
      >
        {/* Primary gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue/[0.07] via-purple/[0.05] to-blue/[0.07] dark:from-blue/[0.05] dark:via-purple/[0.03] dark:to-blue/[0.05]"
          style={{
            x: moveX,
            y: moveY,
          }}
        />

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            x: useTransform(smoothX, [-1, 1], [-10, 10]),
            y: useTransform(smoothY, [-1, 1], [-10, 10]),
            scale: blobScale
          }}
        >
          <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue/[0.08] to-transparent dark:from-blue/[0.06] rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          style={{
            x: useTransform(smoothX, [-1, 1], [10, -10]),
            y: useTransform(smoothY, [-1, 1], [10, -10]),
            scale: blobScale
          }}
        >
          <div className="absolute w-[800px] h-[800px] bg-gradient-to-l from-purple/[0.08] to-transparent dark:from-purple/[0.06] rounded-full blur-3xl" />
        </motion.div>

        {/* Subtle animated accent elements */}
        <motion.div
          className="absolute inset-0"
          style={{ x: moveX, y: moveY }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue/[0.03] dark:bg-blue/[0.02] rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple/[0.03] dark:bg-purple/[0.02] rounded-full blur-2xl" />
        </motion.div>
      </motion.div>

      <BackgroundGradient />
      
      <Dialog open={showResume} onOpenChange={setShowResume}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col gap-4 p-4 sm:p-6 rounded-xl shadow-xl bg-background/95 backdrop-blur-sm border border-blue/10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground/90">Resume</DialogTitle>
          </div>

          <div className="flex-1 relative rounded-lg overflow-hidden border border-muted bg-muted/30">
            <iframe
              src="/resume.pdf#view=FitH&zoom=100"
              className="absolute inset-0 w-full h-full"
              title="Resume"
              style={{ minHeight: "500px" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="section mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="flex flex-col gap-4 text-left md:pr-8">
              <motion.span
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                custom={0}
                className="text-2xl font-display text-muted-foreground/80 font-light"
              >
                Hey 👋 I'm
              </motion.span>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                custom={1}
              >
                <span className="block">Krishiv Khatri</span>
                <span className="text-gradient">CE Student & Builder</span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-md"
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                custom={2}
              >
                I build digital experiences that help people solve real problems.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 mt-4"
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                custom={3}
              >
                <Button 
                  className="bg-gradient-to-r from-blue to-purple hover:from-blue-dark hover:to-purple-dark button-glow text-white relative overflow-hidden group" 
                  size="lg" 
                  asChild
                >
                  <a href="#projects">
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "100%" }}
                      whileHover={{ x: "-100%" }}
                      transition={{ duration: 0.4 }}
                    />
                    View my work
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="button-glow hover:bg-blue/5 hover:text-blue border-blue/20 hover:border-blue/50 relative overflow-hidden group"
                  onClick={() => setShowResume(true)}
                >
                  <motion.span
                    className="absolute inset-0 bg-blue/5"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <FileText className="mr-1 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Resume
                </Button>
              </motion.div>

              <motion.div 
                className="flex gap-4 mt-6"
                variants={fadeUpVariants}
                initial="initial"
                animate="animate"
                custom={4}
              >
                <motion.a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-5 order-1 md:order-2 flex justify-center">
            <div className="relative flex items-center justify-center">
              {/* Profile image container */}
              <motion.div 
                className="relative rounded-full overflow-hidden w-[450px] h-[450px] border border-white/10 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue/5 to-purple/5 mix-blend-overlay pointer-events-none" />
                
                {/* Profile image */}
                <img
                  src="/images/krishiv.jpg"
                  alt="Krishiv Khatri"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "center center",
                    imageRendering: "pixelated"
                  }}
                  loading="eager"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
