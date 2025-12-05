import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tours", href: "/tours" },
  { name: "Villas", href: "/villas" },
  { name: "Experiences", href: "/experiences" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const languages = ["EN", "KU", "AR"];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-deep-dark/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <span className="font-cinzel text-2xl font-bold gradient-text-gold">
                  VIKURDISTAN
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300 group",
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    initial={{ scaleX: location.pathname === link.href ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
                <Globe className="w-4 h-4 text-muted-foreground" />
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full transition-all duration-300",
                      currentLang === lang
                        ? "bg-gold text-deep-dark"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-deep-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>

              <Button variant="gold" size="default">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-deep-dark/95 backdrop-blur-xl" />
            <nav className="relative pt-24 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block text-2xl font-playfair py-3 border-b border-border/30 transition-colors",
                        location.pathname === link.href
                          ? "text-gold"
                          : "text-foreground/70"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6"
                >
                  <Button variant="gold" size="xl" className="w-full">
                    Book Now
                  </Button>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
