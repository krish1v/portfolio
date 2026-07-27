import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperienceItem {
  org: string;
  role: string;
  place: string;
  period: string;
  current?: boolean;
  description: string;
  stack?: string;
}

// Ordered most recent → oldest, so the pan moves from the present backward.
const experiences: ExperienceItem[] = [
  {
    org: "Amazon Web Services",
    role: "Software Development Engineer, Q in Connect",
    place: "Seattle, WA",
    period: "May – Aug 2026",
    current: true,
    description:
      "A tool-retrieval service for the AI agents behind Amazon Connect. It uses BM25, embeddings, and regex to reach about 97% accuracy, cut input tokens by up to 93%, and make the first token about 27% faster.",
    stack: "BM25 · Embeddings · Tool orchestration",
  },
  {
    org: "GFO-X",
    role: "AI Engineer",
    place: "Hong Kong",
    period: "May – Jul 2025",
    description:
      "A RAG engine (vLLM, LangGraph, PyTorch) for internal Jira and Confluence agents. It scored over 90% on RAGAS, cut ticket resolution time by about 40%, and reduced QA cycles by about 70%.",
    stack: "vLLM · LangGraph · PyTorch",
  },
  {
    org: "Georgia Tech",
    role: "BS Computer Science",
    place: "Atlanta, GA",
    period: "2024 – 2028",
    description:
      "Concentrations in AI and Theory. GPA 3.94, Faculty Honors and Dean's List.",
  },
  {
    org: "FundFluent",
    role: "Product Development Intern",
    place: "Hong Kong",
    period: "Jun – Aug 2023",
    description:
      "Automated SEO pipeline (50+ posts, ~120% more organic traffic) and product analytics over 50K+ user events. Won HKU's Most Outstanding Student.",
    stack: "Python · Pandas · SQL",
  },
  {
    org: "Hong Kong Polytechnic University",
    role: "Research Assistant",
    place: "Hong Kong",
    period: "Apr – Aug 2023",
    description:
      "Researched proton-exchange membrane fuel cells (PEMFC) in a competitive program, and built and tested a model car powered by a passive fuel-cell stack.",
    stack: "Fuel Cells · Modeling · Prototyping",
  },
  {
    org: "West Island School",
    role: "IB Diploma",
    place: "Hong Kong",
    period: "2017 – 2024",
    description:
      "IB 44, ACT 35. Head Student; founded the Young Entrepreneurs Club; debate, olympiads, volleyball, and service leadership.",
  },
];

const NODE_W = 460;

function Dot({ current }: { current?: boolean }) {
  return (
    <span className="relative grid place-items-center">
      {current && (
        <span className="absolute h-5 w-5 rounded-full border border-gray-900/40 animate-ping" />
      )}
      <span
        className={
          current
            ? "h-3.5 w-3.5 rounded-full bg-black ring-2 ring-white"
            : "h-3 w-3 rounded-full bg-black"
        }
      />
    </span>
  );
}

function Card({ item, fixedHeight }: { item: ExperienceItem; fixedHeight?: boolean }) {
  return (
    <div
      className={`bg-white border border-gray-900/15 rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
        fixedHeight ? "h-[17rem] flex flex-col justify-center" : ""
      }`}
    >
      {item.current && (
        <span className="inline-flex items-center gap-1.5 mb-2 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-gray-900">
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          Current
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-gray-900 leading-tight">
        {item.org}
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        {item.role} · {item.place}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
      {item.stack && (
        <p className="mt-3 text-xs font-mono text-gray-400">{item.stack}</p>
      )}
    </div>
  );
}

export function ExperienceSection() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const horizontal = !isMobile && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const [dims, setDims] = useState({ maxX: 0, pad: 24 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.1", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.22,
  });
  const x = useTransform(smooth, (v) => -dims.maxX * v);
  // Heading lifts away and fades out as soon as the horizontal pan begins.
  const headingOpacity = useTransform(smooth, [0, 0.08], [1, 0]);
  const headingY = useTransform(smooth, [0, 0.08], [0, -70]);

  useEffect(() => {
    if (!horizontal) return;
    const measure = () => {
      const vw = window.innerWidth;
      const pad = Math.max(24, (vw - NODE_W) / 2);
      const trackWidth = pad * 2 + experiences.length * NODE_W;
      setDims({ maxX: Math.max(0, trackWidth - vw), pad });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [horizontal]);

  // --- Mobile / reduced-motion: a clean vertical timeline (newest first) ---
  if (!horizontal) {
    return (
      <section id="experience" className="relative bg-white border-t border-border/20 py-20">
        <div className="section">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Experience</h2>
          <div className="relative mt-12 pl-8">
            <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-gray-900/20" />
            {experiences.map((item) => (
              <div key={item.org} className="relative pb-10 last:pb-0">
                <span className="absolute -left-8 top-1.5">
                  <Dot current={item.current} />
                </span>
                <p className="text-xs font-mono text-gray-500">{item.period}</p>
                <div className="mt-2">
                  <Card item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Desktop: scroll-linked horizontal pan through time ---
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-white border-t border-border/20"
      style={{ height: `${Math.max(240, experiences.length * 58)}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Continuous time axis — fixed to the viewport so the line never breaks */}
        <div className="pointer-events-none absolute inset-x-0 top-[54%] -translate-y-1/2 h-px bg-gray-900/25 z-0" />

        {/* Heading + hint — lifts out of frame once the pan begins */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute top-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 sm:px-8 pt-6"
        >
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Experience</h2>
            <p className="hidden sm:block text-xs font-mono uppercase tracking-[0.16em] text-gray-400">
              Scroll · recent → earliest
            </p>
          </div>
        </motion.div>

        {/* Panning track (nodes only; the axis line stays fixed above) */}
        <motion.div
          style={{ x }}
          className="absolute inset-x-0 top-[8vh] bottom-0 z-10 flex items-stretch will-change-transform"
        >
          {/* leading gutter */}
          <div className="shrink-0" style={{ width: dims.pad }} />

          {experiences.map((item, i) => {
            const above = i % 2 === 0;
            return (
              <div
                key={item.org}
                className="relative h-full shrink-0"
                style={{ width: NODE_W }}
              >
                {/* card */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-[360px] ${
                    above ? "bottom-1/2 mb-8" : "top-1/2 mt-8"
                  }`}
                >
                  <Card item={item} fixedHeight />
                </div>

                {/* connector */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-px bg-gray-900/40 ${
                    above ? "bottom-1/2 h-8" : "top-1/2 h-8"
                  }`}
                />

                {/* dot on the axis */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <Dot current={item.current} />
                </div>

                {/* period on the opposite side of the card */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-gray-500 ${
                    above ? "top-1/2 mt-5" : "bottom-1/2 mb-5"
                  }`}
                >
                  {item.period}
                </div>
              </div>
            );
          })}

          {/* trailing gutter */}
          <div className="shrink-0" style={{ width: dims.pad }} />
        </motion.div>
      </div>
    </section>
  );
}
