import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, Globe, ExternalLink, Apple } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[]; // For projects with multiple showcase images
  videoUrl?: string; // For embedded videos
  liveUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  features?: string[];
  technologies?: string[];
}

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

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
          {
        id: 1,
        title: "SlideIn",
        description: "A cold outreach automation tool with AI-generated emails, reply tracking, and real-time analytics.",
        tags: ["Gemini API", "Next.js", "Web Scraping", "Supabase", "Tailwind", "Postgres", "Google Cloud Platform", "Vercel"],
        image: "/images/projects/slidein.png",
        liveUrl: "https://slidein.now",
        githubUrl: "https://github.com/krishiv-khatri/SlideIn",
        detailedDescription: "SlideIn is the first B2C focused SaaS outreach platform that reimagines how people connect with audiences. lideIn generates personalized emails, automates sending, and tracks responses with real-time analytics. After launch, the project gained viral traction on Twitter and LinkedIn, reaching over 500,000+ impressions within a week, with an evolving product vision of becoming a 'Tinder for outreach.'",
        features: [
          "🏆 1st place at GT Shipathon 2025 hackathon",
          "Viral launch with 500,000+ impressions across social media",
          "AI-generated personalized outreach messages",
          "Automated sending, reply tracking, and real-time analytics dashboard",
          "Scalable backend built with Supabase + Next.js"
        ],
        technologies: ["Gemini API", "Next.js", "Web Scraping", "Supabase", "Stripe", "Tailwind", "Postgres", "Google Cloud Platform", "Vercel"]
      },
              {
          id: 2,
          title: "LinkUp app",
          description: "A social event discovery platform for Southeast Asia, connecting communities in HK, SG, and KL through events, private gatherings, and friend networks.",
          tags: ["Mobile Development","IOS/Android", "React Native", "Expo", "UI/UX Design", "TypeScript"],
          image: "/images/projects/linkup.png",
          githubUrl: "https://github.com/krishiv-khatri/LinkUp",
        detailedDescription: "LinkUp is a mobile social event discovery and meetup platform designed for Southeast Asia's dynamic youth communities, starting with Hong Kong, Singapore, and Kuala Lumpur. It enables users to discover trending events, create private or invite-only gatherings, and manage RSVPs seamlessly. Beyond events, LinkUp also includes a friends feature that allows users to connect, send requests, and view friends' events, which adds to its role as both a discovery tool and a social network. The backend handles event management, user authentication, friend relationships, and private access control, while the frontend delivers a sleek and modern user experience.",
        features: [
          "Event discovery, creation, and filtering for Southeast Asian cities",
          "Create private or invite-only gatherings with RSVP management",
          "Friends system with connection requests and social graph",
          "Real-time event updates, announcements and notifications",
          "Cross-platform mobile app for iOS and Android"
        ],
        technologies: [
          "Mobile Development",
          "iOS/Android",
          "React Native",
          "Expo",
          "TypeScript",
          "Supabase",
          "User Authentication",
          "Real-time Database",
          "Event & User Management",
          "Social Graph (Friends System)",
          "UI/UX Design"
        ]
      },
              {
          id: 3,
          title: "Bluetooth Light Switch",
          description: "A Bluetooth-controlled servo-motor light switch using Arduino, combining embedded systems, serial/UART communication, and IoT hardware for remote control via mobile devices.",
          tags: [
            "Arduino", 
            "Embedded Systems", 
            "Bluetooth UART", 
            "Circuit Design", 
            "IoT", 
            "Servo Motor Control"
          ],
          image: "/images/projects/bt-switch-main.avif",
          videoUrl: "https://www.youtube.com/embed/CPBzU7OqzU0",
          images: [
            "/images/projects/bt-switch-main.avif",  // Fallback image if video fails
            "/images/projects/bt-switch-main.avif", // Horizontal detail 1
            "/images/projects/bt-switch-detail.avif" // Horizontal detail 2
          ],
          detailedDescription: "This project was inspired by a simple daily challenge: my dorm bed was bunked, and turning the lights on and off meant climbing up and down every night. To solve this, I built a Bluetooth-controlled light switch using an Arduino Uno, an Adafruit Bluefruit LE UART module, and a servo motor that could toggle the mechanical switch remotely via a mobile app. This project taught me embedded programming, serial communication (UART), power management, and IoT principles while demonstrating how small hardware hacks can meaningfully improve everyday life.",
          features: [
            "Embedded programming to interpret Bluetooth commands and control servo motor positions",
            "UART serial communication with SoftwareSerial for reliable Bluetooth data parsing",
            "Circuit design and power distribution for stable operation",
            "3D-printed housing to securely mount Arduino, Bluetooth module, and servo motor",
            "IoT application: remote mobile-to-hardware interaction for smart home control"
          ],
          technologies: ["Arduino", "C++", "Bluetooth UART", "Circuit Design", "IoT", "Servo Motors", "Embedded Systems", "3D Printing", "Computer Aided Design (CAD)"]
      },
              {
          id: 4,
          title: "Autonomous Delivery Robot",
          description: "A multifunctional robot capable of autonomous delivery, maze navigation, and room sweeping.",
          tags: ["Python", "Robotics", "Path Planning", "Asynchronous Programming","Sensors", "Algorithms"],
          image: "/images/projects/robot.jpeg",
        detailedDescription: "This project involved building a delivery robot that demonstrates adaptive navigation in maze-like environments. The robot uses path-planning algorithms to determine efficient routes, integrates obstacle detection for real-time avoidance, and supports multiple operational modes including waypoint-based delivery and autonomous room sweeping. By leveraging asynchronous programming in Python, the robot can process sensor input and control actuators in parallel, enabling responsive decision-making and smooth navigation.",
        features: [
          "Path-planning algorithms for efficient maze navigation and targeted delivery",
          "Real-time obstacle detection and avoidance using sensor feedback",
          "Asynchronous programming to handle sensor data, motor control, and navigation logic concurrently",
          "Targeted delivery system with waypoint-based path selection",
          "Adaptive room sweeping functionality with dynamic coverage"
        ],
        technologies: ["Python", "Robotics", "Asynchronous Programming", "Sensors", "Algorithms", "Embedded Systems"]
      },
  ];

  return (
    <section id="projects" className="relative py-20 md:py-24 overflow-hidden bg-white border-t border-border/20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one taught me something new and helped me grow as a developer.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeUpVariants}
              custom={index}
              className="group"
            >
              <motion.div
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-white">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.backgroundColor = '#ffffff';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Actions */}
                  <div className="mt-auto">
                    <div className="flex gap-3">
                      {project.liveUrl ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 text-sm py-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.liveUrl, '_blank');
                            }}
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            View Project
                          </Button>
                        </motion.div>
                      ) : project.title === "LinkUp app" ? (
                        <div className="flex-1">
                          <Button
                            disabled
                            className="w-full bg-blue-600 text-white rounded-lg font-medium text-sm py-2 opacity-75 cursor-not-allowed"
                          >
                            <Apple className="h-4 w-4 mr-2" />
                            Coming to App Store Soon
                          </Button>
                        </div>
                      ) : null}
                      
                      {project.githubUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.githubUrl, '_blank');
                            }}
                          >
                            <Github className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Learn More Link */}
                    <motion.div
                      className="mt-4 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group-hover:text-blue-600"
                      whileHover={{ x: 4 }}
                    >
                      <span className="font-sans">Learn more</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all duration-300"
              asChild
            >
              <a href="https://github.com/krishiv-khatri" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View more on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-5xl w-[95vw] max-h-[95vh] overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-3xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full max-h-[90vh]"
              >
                {/* Header */}
                <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-100">
                  <DialogTitle className="text-3xl font-bold text-gray-900 font-sans mb-2">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-gray-600 font-sans leading-relaxed">
                    {selectedProject.description}
                  </DialogDescription>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Project Image/Showcase */}
                  {selectedProject.images && selectedProject.images.length > 1 ? (
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-5xl mx-auto">
                      {/* Main Vertical Video - Left Side */}
                      <div className="flex-shrink-0">
                        <div className="relative aspect-[9/16] w-80 overflow-hidden rounded-xl bg-white">
                          {selectedProject.videoUrl ? (
                            <iframe
                              src={`${selectedProject.videoUrl}?autoplay=1&mute=1&controls=1&loop=1&playlist=${selectedProject.videoUrl.split('/').pop()}`}
                              title={`${selectedProject.title} - Demo Video`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <img
                              src={selectedProject.images[0]}
                              alt={`${selectedProject.title} - Main View`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                          )}
                        </div>
                      </div>
                      
                      {/* Two Horizontal Detail Images - Right Side */}
                      <div className="flex flex-col justify-center space-y-4 w-[369px]">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                          <img
                            src={selectedProject.images[1]}
                            alt={`${selectedProject.title} - Detail 1`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                          <img
                            src={selectedProject.images[2]}
                            alt={`${selectedProject.title} - Detail 2`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-white">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.style.backgroundColor = '#ffffff';
                        }}
                      />
                    </div>
                  )}

                  {/* Overview and Features Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Overview */}
                    <div className="space-y-6">
                      <div className="bg-gray-50/50 rounded-2xl p-6">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4 font-sans flex items-center">
                          <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                          Overview
                        </h4>
                        <p className="text-gray-700 leading-relaxed font-sans">
                          {selectedProject.detailedDescription}
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Key Features */}
                    <div className="space-y-6">
                      {selectedProject.features && (
                        <div className="bg-gray-50/50 rounded-2xl p-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 font-sans flex items-center">
                            <div className="w-1 h-6 bg-purple-600 rounded-full mr-3"></div>
                            Key Features
                          </h4>
                          <ul className="space-y-3">
                            {selectedProject.features.map((feature, index) => (
                              <li key={index} className="flex items-start group">
                                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2.5 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                                <span className="text-gray-700 font-sans leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies Used - Full Width */}
                  {selectedProject.technologies && (
                    <div className="bg-gray-50/50 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 font-sans flex items-center">
                        <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium font-sans shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Action Buttons */}
                {selectedProject.title !== "Bluetooth Light Switch" && (
                  <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100 bg-gray-50/30">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {selectedProject.liveUrl ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            size="lg"
                            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            asChild
                          >
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <Globe className="mr-3 h-5 w-5" />
                              Visit Live Site
                            </a>
                          </Button>
                        </motion.div>
                      ) : selectedProject.title === "LinkUp app" ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            size="lg"
                            disabled
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg opacity-75 cursor-not-allowed"
                          >
                            <div className="flex items-center">
                              <Apple className="h-5 w-5 mr-3" />
                              <span>Coming to App Store Soon</span>
                            </div>
                          </Button>
                        </motion.div>
                      ) : null}

                      {selectedProject.githubUrl && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="outline"
                            size="lg"
                            className="border-2 border-gray-300 hover:border-gray-400 hover:bg-white text-gray-700 px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            asChild
                          >
                            <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <Github className="mr-3 h-5 w-5" />
                              View Source Code
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
