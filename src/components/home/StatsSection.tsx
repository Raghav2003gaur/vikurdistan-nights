import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mountain, Users, Star, MapPin } from "lucide-react";

const stats = [
  { icon: Mountain, value: 500, suffix: "+", label: "Unique Destinations" },
  { icon: Users, value: 50000, suffix: "+", label: "Happy Travelers" },
  { icon: Star, value: 4.9, suffix: "", label: "Average Rating" },
  { icon: MapPin, value: 120, suffix: "+", label: "Local Guides" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {value === 4.9 ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-dark via-charcoal to-deep-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/50 border border-border/50 mb-4 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-500">
                <stat.icon className="w-7 h-7 text-gold" />
              </div>
              <div className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
