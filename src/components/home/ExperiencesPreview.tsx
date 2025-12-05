import { motion } from "framer-motion";
import { Mountain, Landmark, UtensilsCrossed, Snowflake, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

const experiences = [
  {
    id: 1,
    icon: Mountain,
    title: "Nature",
    description: "Majestic mountains, hidden valleys, and pristine waterfalls",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    count: 45,
  },
  {
    id: 2,
    icon: Landmark,
    title: "Culture",
    description: "Ancient traditions, vibrant festivals, and local crafts",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    count: 32,
  },
  {
    id: 3,
    icon: UtensilsCrossed,
    title: "Food",
    description: "Authentic Kurdish cuisine and culinary adventures",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    count: 28,
  },
  {
    id: 4,
    icon: Snowflake,
    title: "Snow",
    description: "Winter wonderlands and alpine experiences",
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
    count: 18,
  },
  {
    id: 5,
    icon: History,
    title: "History",
    description: "Archaeological sites and ancient civilizations",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
    count: 24,
  },
];

export const ExperiencesPreview = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-deep-dark to-charcoal" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-medium mb-2"
          >
            Curated Experiences
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Discover Your Adventure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            From mountain peaks to ancient ruins, find the perfect experience that speaks to your soul.
          </motion.p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative overflow-hidden rounded-2xl cursor-pointer group",
                index === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[4/5]"
              )}
            >
              {/* Background Image */}
              <motion.img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hoveredId === exp.id ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors",
                  index === 0 && "w-16 h-16"
                )}>
                  <exp.icon className={cn("text-gold", index === 0 ? "w-8 h-8" : "w-6 h-6")} />
                </div>

                <h3 className={cn(
                  "font-playfair font-bold text-foreground mb-2 group-hover:text-gold transition-colors",
                  index === 0 ? "text-3xl" : "text-xl"
                )}>
                  {exp.title}
                </h3>

                <p className={cn(
                  "text-muted-foreground mb-4 line-clamp-2",
                  index === 0 ? "text-base" : "text-sm"
                )}>
                  {exp.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gold">{exp.count} experiences</span>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: hoveredId === exp.id ? 0 : -10, opacity: hoveredId === exp.id ? 1 : 0 }}
                    className="text-gold"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 50% 100%, hsl(45 60% 53% / 0.2), transparent 60%)"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/experiences">
            <Button variant="gold-outline" size="lg" className="gap-2">
              Explore All Experiences
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
