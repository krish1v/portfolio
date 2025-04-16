import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SectionDivider variant="wave" className="text-blue/40" />
        <AboutSection />
        <SectionDivider variant="angle" className="text-purple/40" />
        <ProjectsSection />
        <SectionDivider variant="curve" className="text-blue/40" />
        <ExperienceSection />
        <SectionDivider variant="wave" className="text-purple/40" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
