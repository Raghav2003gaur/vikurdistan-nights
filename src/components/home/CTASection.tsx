import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-dark via-deep-dark/90 to-deep-dark/70" />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(45 60% 53% / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(45 60% 53% / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(45 60% 53% / 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold">Limited Time Offer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            Ready for Your
            <br />
            <span className="gradient-text-gold">Kurdistan Adventure?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-xl"
          >
            Book now and save up to 20% on your first trip. 
            Let us craft an unforgettable journey through the heart of Kurdistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/tours">
              <Button variant="gold" size="xl" className="gap-2">
                Start Planning
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="xl">
                Talk to Expert
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-border/30"
          >
            <div>
              <p className="text-3xl font-bold text-foreground">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
