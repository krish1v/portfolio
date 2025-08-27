
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
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

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-3 border-b border-gray-200"
            : "bg-white py-4"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <motion.ul 
              className="flex gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1, 
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <motion.a
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium relative"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.7, 
                duration: 0.4,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 ml-4 shadow-sm hover:shadow-md"
                  onClick={() => setShowResume(true)}
                >
                  Resume
                </Button>
              </motion.div>
            </motion.div>
          </nav>

          {/* Mobile Navigation */}
          <motion.div 
            className="flex items-center gap-3 md:hidden"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <motion.ul 
                  className="flex flex-col gap-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                      </motion.a>
                    </motion.li>
                  ))}
                  <motion.li 
                    className="pt-4 border-t border-gray-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        onClick={() => {
                          setShowResume(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Resume
                      </Button>
                    </motion.div>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
