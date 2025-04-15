
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Code, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glassmorphism shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold text-lg group"
        >
          <Code className="text-blue-DEFAULT group-hover:text-blue-light transition-colors duration-300" />
          <span className="group-hover:text-gradient transition-all duration-300">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-medium opacity-80 hover:opacity-100 transition-all duration-300 link-underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="accent" 
              asChild
              className="bg-blue-DEFAULT hover:bg-blue-DEFAULT/90 button-glow"
            >
              <a href="#contact" className="group">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get in touch</span>
              </a>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-blue-DEFAULT/10"
          >
            {isMobileMenuOpen ? <X className="text-blue-DEFAULT" /> : <Menu className="text-blue-DEFAULT" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism border-t border-muted/30 animate-slide-in">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium transition-colors duration-300 hover:text-blue-DEFAULT"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Button 
                  variant="accent" 
                  className="w-full mt-2 bg-blue-DEFAULT hover:bg-blue-DEFAULT/90 button-glow" 
                  asChild
                >
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get in touch
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
