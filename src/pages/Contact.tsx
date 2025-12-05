import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-4">
              Get in <span className="gradient-text-gold">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions about your Kurdistan adventure? We're here to help plan your perfect journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-8 md:p-10">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="bg-secondary/50 border-border/50 focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-secondary/50 border-border/50 focus:border-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                      className="bg-secondary/50 border-border/50 focus:border-gold"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your travel plans..."
                      rows={5}
                      required
                      className="bg-secondary/50 border-border/50 focus:border-gold resize-none"
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="relative h-64 rounded-2xl overflow-hidden glass-card">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Location Map"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-foreground font-semibold">Erbil, Kurdistan Region</p>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid gap-4">
                <div className="glass-card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:+9647501234567" className="text-foreground font-medium hover:text-gold transition-colors">
                      +964 750 123 4567
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:hello@vikurdistan.com" className="text-foreground font-medium hover:text-gold transition-colors">
                      hello@vikurdistan.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/9647501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 flex items-center gap-4 group hover:border-[#25D366]/50 hover:shadow-[0_0_30px_rgba(37,211,102,0.2)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Chat on WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Get instant response</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4 text-foreground" />
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Follow us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 hover:shadow-[0_0_20px_hsl(45_60%_53%/0.2)] transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default Contact;
