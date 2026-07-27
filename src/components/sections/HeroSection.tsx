import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { HeroWaves } from "@/components/ui/HeroWaves";

export function HeroSection() {
  const [showResume, setShowResume] = useState(false);
  const reduce = useReducedMotion();

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Krishiv_Khatri_Resume.pdf";
    link.click();
  };

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-white overflow-hidden flex items-center py-20"
    >
      {/* Generative wavefield — the hero's centrepiece */}
      <div className="absolute inset-0 z-0">
        <HeroWaves className="h-full w-full" />
      </div>
      {/* Readability veil: keep the left column clean, let the field breathe on the right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.88) 34%, rgba(255,255,255,0.25) 66%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(rgba(255,255,255,0), #ffffff)" }}
      />

      {/* Resume dialog */}
      <Dialog open={showResume} onOpenChange={setShowResume}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col gap-4 p-4 sm:p-6 rounded-lg shadow-xl bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Resume</DialogTitle>
            <Button
              onClick={handleDownloadResume}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 mr-10"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
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

      {/* Content */}
      <div className="section relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            {...rise(0.15)}
            className="font-display font-semibold text-black leading-[0.92] tracking-tight text-6xl sm:text-7xl lg:text-8xl"
          >
            Krishiv Khatri
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mt-6 text-xl font-medium text-gray-600"
          >
            Computer Science student at Georgia Tech
          </motion.p>

          <motion.p
            {...rise(0.42)}
            className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600"
          >
            Passionate about building solutions and products that turn ideas
            into meaningful impact.
          </motion.p>

          <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-lg"
              onClick={() => setShowResume(true)}
            >
              Resume
            </Button>
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

          <motion.div {...rise(0.58)} className="mt-8 flex items-center gap-5">
            <a
              href="https://linkedin.com/in/krishiv-khatri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-black transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/krishivkhatri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-gray-400 hover:text-black transition-colors"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <span className="h-4 w-px bg-gray-200" aria-hidden="true" />
            <a
              href="mailto:krishivkhatri@gatech.edu"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              krishivkhatri@gatech.edu
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
