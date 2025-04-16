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
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]);

  // Alternating background styles
  const isEven = index % 2 === 0;
  const backgroundStyle = isEven
    ? "bg-gradient-to-b from-transparent via-blue/[0.02] to-transparent dark:from-transparent dark:via-blue/[0.01] dark:to-transparent"
    : "bg-gradient-to-b from-transparent via-purple/[0.02] to-transparent dark:from-transparent dark:via-purple/[0.01] dark:to-transparent";

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
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className={cn(
            "absolute inset-0",
            isEven 
              ? "bg-[radial-gradient(ellipse_at_top,_var(--blue-rgb)_0%,_transparent_70%)]" 
              : "bg-[radial-gradient(ellipse_at_bottom,_var(--purple-rgb)_0%,_transparent_70%)]"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Content container with scroll-based animations */}
      <motion.div 
        className="container mx-auto px-4 relative"
        style={{ 
          y,
          scale,
          opacity
        }}
      >
        {/* Angled clip path for visual interest */}
        <div 
          className="relative"
          style={{
            clipPath: isEven
              ? "polygon(0 0, 100% 2%, 100% 100%, 0 98%)"
              : "polygon(0 2%, 100% 0, 100% 98%, 0 100%)"
          }}
        >
          {children}
        </div>
      </motion.div>

      {/* Subtle animated grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.section>
  );
} 