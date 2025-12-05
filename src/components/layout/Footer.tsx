import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  explore: [
    { name: "Tours", href: "/tours" },
    { name: "Villas", href: "/villas" },
    { name: "Experiences", href: "/experiences" },
    { name: "About Kurdistan", href: "/about" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-deep-dark border-t border-border/30">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <span className="font-cinzel text-3xl font-bold gradient-text-gold">
                VIKURDISTAN
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Beyond Borders. Beyond Beauty. Discover the untold wonders of Kurdistan 
              through luxury experiences crafted for the discerning traveler.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive offers and travel inspiration.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-secondary/50 border-border/50 focus:border-gold"
              />
              <Button variant="gold" size="icon">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="tel:+9647501234567"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                +964 750 123 4567
              </a>
              <a
                href="mailto:hello@vikurdistan.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@vikurdistan.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Erbil, Kurdistan Region
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Vikurdistan. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion for the land of mountains.
          </p>
        </div>
      </div>
    </footer>
  );
};
