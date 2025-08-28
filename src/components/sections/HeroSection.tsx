import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";

const fadeUpVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  const [showResume, setShowResume] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen bg-white overflow-hidden flex items-center py-20"
    >
      {/* Minimal background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-full blur-3xl opacity-30" />
      </div>

      <Dialog open={showResume} onOpenChange={setShowResume}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col gap-4 p-4 sm:p-6 rounded-lg shadow-xl bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Resume</DialogTitle>
          </div>
          <div className="flex-1 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <iframe
              src="/resume.pdf#view=FitH&zoom=100"
              className="absolute inset-0 w-full h-full"
              title="Resume"
              style={{ minHeight: "500px" }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <motion.div 
        className="section relative z-10"
        style={{ y: yTransform }}
      >
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] lg:justify-start lg:max-w-5xl"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Profile Photo - Left Column */}
          {/* 
          🖼️ PHOTO CONTROLS:
          
          HORIZONTAL ALIGNMENT:
          - justify-center: Centered (current)
          - justify-start: Left aligned  
          - justify-end: Right aligned (brings closer to text)
          
          PHOTO SIZE:
          - w-80 h-96 lg:w-96 lg:h-[32rem]: Current size (320px/384px, 384px/512px)
          - w-72 h-90 lg:w-80 lg:h-[28rem]: Smaller
          - w-96 h-[30rem] lg:w-[28rem] lg:h-[36rem]: Larger
          */}
          <motion.div 
            className="order-2 lg:order-1 flex justify-center lg:justify-end"
            variants={fadeUpVariants}
            custom={0}
          >
            <motion.div 
              className="relative w-80 h-96 lg:w-96 lg:h-[28rem] xl:w-[26rem] xl:h-[32rem]"
              variants={imageVariants}
              initial="initial"
              animate="animate"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white">
                <img
                  src="/images/krishiv.jpg"
                  alt="Krishiv Khatri"
                  className="w-full h-full object-cover rounded-2xl"
                  style={{
                    objectPosition: "center center"
                  }}
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content - Right Column */}
          {/* 
          📝 TEXT CONTROLS:
          
          TEXT ALIGNMENT:
          - text-center lg:text-left: Center on mobile, left on desktop (current)
          - text-center: Always centered
          - text-left: Always left aligned
          
          CONTENT WIDTH:
          - No constraint: Full width (current)
          - max-w-xl: Narrow text (576px)
          - max-w-2xl: Medium text (672px) 
          - max-w-3xl: Wide text (768px)
          */}
          <motion.div 
            className="order-1 lg:order-2 text-center lg:text-left"
            variants={fadeUpVariants}
            custom={1}
          >
            <motion.div className="space-y-4">
              <motion.div
                variants={fadeUpVariants}
                custom={2}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-black"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.span 
                    className="inline-block"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Krishiv
                  </motion.span>{" "}
                  <motion.span 
                    className="inline-block"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Khatri
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p 
                className="text-xl font-medium text-gray-600"
                variants={fadeUpVariants}
                custom={3}
              >
                Computer Science Student at Georgia Tech
              </motion.p>

              <motion.p 
                className="text-lg leading-relaxed text-gray-700 max-w-xl mx-auto lg:mx-0"
                variants={fadeUpVariants}
                custom={4}
              >
                Passionate about building software and products that turn ideas into meaningful impact.
              </motion.p>

              {/* Contact Information */}
              <motion.div 
                className="flex flex-col gap-2 justify-center lg:justify-start pt-4"
                variants={fadeUpVariants}
                custom={4.5}
              >
                <motion.a
                  href="mailto:krishivkhatri@gatech.edu"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-bold text-gray-900">Email:</span> krishivkhatri@gatech.edu
                </motion.a>
                
                <motion.a
                  href="tel:+14042693031"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-bold text-gray-900">Phone:</span> (404) 269-3031
                </motion.a>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6"
                variants={fadeUpVariants}
                custom={5}
              >
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-lg" 
                    onClick={() => setShowResume(true)}
                  >
                    Resume
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 group"
                    asChild
                  >
                    <a href="#projects">
                      View Projects
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-6 justify-center lg:justify-start pt-6"
                variants={fadeUpVariants}
                custom={6}
              >
                {[
                  { 
                    href: "https://linkedin.com/in/krishiv-khatri", 
                    icon: FaLinkedin, 
                    label: "LinkedIn",
                    color: "#0077B5"
                  },
                  { 
                    href: "https://x.com/krishivkhatri", 
                    icon: FaTwitter, 
                    label: "Twitter",
                    color: "#1DA1F2"
                  }
                ].map(({ href, icon: Icon, label, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={label}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -4,
                      rotate: [0, -10, 10, 0],
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 1.2 + index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    <Icon className="social-icon h-6 w-6 transition-all duration-300" style={{ color: color }} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
