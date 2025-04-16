
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
          ? "bg-background/50 backdrop-blur-xl shadow-sm py-3 border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold text-lg group"
        >
          <Code className="text-blue transition-colors group-hover:text-purple duration-300" />
          <span className="group-hover:text-gradient transition-all duration-300">Krishiv Khatri</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity link-underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              className="bg-gradient-to-r from-blue/90 to-purple/90 hover:from-blue hover:to-purple text-white border-0 transition-all duration-300 hover:shadow-md hover:shadow-blue/20 px-5 rounded-full hover:scale-[1.02]"
              asChild
            >
              <a href="#contact">Get in touch</a>
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
            className="hover:bg-background/20"
          >
            {isMobileMenuOpen ? <X className="text-blue" /> : <Menu className="text-blue" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 animate-slide-in">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-base font-medium hover:text-blue transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Button 
                  className="w-full mt-2 bg-gradient-to-r from-blue/90 to-purple/90 hover:from-blue hover:to-purple text-white border-0 transition-all duration-300 hover:shadow-md hover:shadow-blue/20 rounded-full"
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
