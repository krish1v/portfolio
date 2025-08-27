import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  index?: number; // Used for alternating styles
}

export function SectionWrapper({ 
  children, 
  className, 
  id, 
  index = 0, 
  ...props 
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and opacity effects
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Alternating background styles with very subtle mid-tone banding
  const isEven = index % 2 === 0;
  const backgroundStyle = isEven
    ? "bg-gradient-to-b from-transparent via-black/[0.01] to-transparent dark:via-white/[0.015]"
    : "bg-gradient-to-b from-transparent via-black/[0.012] to-transparent dark:via-white/[0.02]";

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        backgroundStyle,
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {/* Content container with scroll-based animations */}
      <motion.div 
        className="container mx-auto px-4 relative"
        style={{ 
          y,
          scale,
          opacity
        }}
      >
        {children}
      </motion.div>

      {/* Subtle animated grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.section>
  );
} 