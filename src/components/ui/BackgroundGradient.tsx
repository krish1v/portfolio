import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className }: BackgroundGradientProps) {
  // Mouse movement effect with spring physics for smooth movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create smooth spring animations for each blob
  const blob1X = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const blob1Y = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const blob2X = useSpring(mouseX, { damping: 50, stiffness: 150 });
  const blob2Y = useSpring(mouseY, { damping: 50, stiffness: 150 });
  const blob3X = useSpring(mouseX, { damping: 70, stiffness: 100 });
  const blob3Y = useSpring(mouseY, { damping: 70, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Convert mouse position to normalized coordinates (-0.5 to 0.5)
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", className)}>
      {/* Primary gradient blob - follows mouse quickly */}
      <motion.div
        style={{
          translateX: blob1X.get() * 200,
          translateY: blob1Y.get() * 200,
        }}
        animate={{
          opacity: [0.4, 0.2, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue/30 to-purple/30 rounded-full blur-3xl"
      />

      {/* Secondary gradient blob - inverse movement */}
      <motion.div
        style={{
          translateX: blob2X.get() * -150,
          translateY: blob2Y.get() * -150,
        }}
        animate={{
          opacity: [0.3, 0.15, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-purple/30 to-blue/30 rounded-full blur-3xl"
      />

      {/* Accent gradient blob - subtle movement */}
      <motion.div
        style={{
          translateX: blob3X.get() * 100,
          translateY: blob3Y.get() * 100,
        }}
        animate={{
          opacity: [0.2, 0.1, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-bl from-blue/20 via-purple/20 to-transparent rounded-full blur-3xl"
      />

      {/* Interactive glow effect */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${50 + blob1X.get() * 30}% ${50 + blob1Y.get() * 30}%, 
            rgba(var(--blue-rgb), 0.08) 0%,
            rgba(var(--purple-rgb), 0.04) 45%,
            transparent 70%)`
        }}
        className="absolute inset-0"
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </div>
  );
} 