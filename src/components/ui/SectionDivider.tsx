import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "wave" | "angle" | "curve";
}

export function SectionDivider({ className, variant = "wave" }: SectionDividerProps) {
  const paths = {
    wave: "M0 25h2000c-40-6.7-80-13.3-120-20-320-53.3-640-106.7-960-160C600-208.3 280-155 0-55v80z",
    angle: "M0 50L1000 0L2000 50V0H0",
    curve: "M0,0 C500,100 1500,100 2000,0 L2000,50 L0,50 Z"
  };

  return (
    <div className={cn("relative h-24 -mb-24 overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-full relative"
      >
        {/* Main divider shape */}
        <svg
          viewBox="0 0 2000 100"
          className="absolute w-[200%] left-1/2 -translate-x-1/2 fill-background stroke-border"
          preserveAspectRatio="none"
        >
          <path
            d={paths[variant]}
            className="opacity-75"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />

        {/* Accent lines */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-border/60 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-border/60 to-transparent" />

        {/* Glowing dots */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-border/80 blur-[1px]" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-border/80 blur-[1px]" />
      </motion.div>
    </div>
  );
} 