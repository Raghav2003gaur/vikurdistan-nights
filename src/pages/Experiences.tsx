import { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Landmark, UtensilsCrossed, Snowflake, History, ArrowRight, Clock, Users, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "nature", icon: Mountain, label: "Nature" },
  { id: "culture", icon: Landmark, label: "Culture" },
  { id: "food", icon: UtensilsCrossed, label: "Food" },
  { id: "snow", icon: Snowflake, label: "Snow" },
  { id: "history", icon: History, label: "History" },
];

const experiences = [
  {
    id: 1,
    category: "nature",
    title: "Sunrise Trek to Halgurd Summit",
    description: "Witness breathtaking sunrise from Kurdistan's highest peak",
    duration: "8 hours",
    groupSize: "4-8",
    price: 189,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    category: "culture",
    title: "Kurdish Traditional Dance Workshop",
    description: "Learn authentic Kurdish dances from local masters",
    duration: "3 hours",
    groupSize: "6-12",
    price: 79,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
  },
  {
    id: 3,
    category: "food",
    title: "Farm-to-Table Culinary Journey",
    description: "Cook with local ingredients in a traditional Kurdish home",
    duration: "5 hours",
    groupSize: "4-6",
    price: 129,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: 4,
    category: "snow",
    title: "Korek Mountain Ski Adventure",
    description: "Experience world-class skiing in the Kurdish Alps",
    duration: "Full day",
    groupSize: "2-6",
    price: 249,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
  },
  {
    id: 5,
    category: "history",
    title: "Citadel of Erbil Guided Tour",
    description: "Explore one of the world's oldest continuously inhabited cities",
    duration: "4 hours",
    groupSize: "4-10",
    price: 69,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
  },
  {
    id: 6,
    category: "nature",
    title: "Gali Ali Beg Waterfall Experience",
    description: "Journey through stunning canyon landscapes to majestic waterfalls",
    duration: "6 hours",
    groupSize: "4-8",
    price: 149,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
  },
  {
    id: 7,
    category: "culture",
    title: "Pottery Making with Artisans",
    description: "Create traditional Kurdish pottery with master craftsmen",
    duration: "3 hours",
    groupSize: "2-6",
    price: 89,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
  },
  {
    id: 8,
    category: "food",
    title: "Street Food Night Tour",
    description: "Taste the best of Kurdish street cuisine after dark",
    duration: "4 hours",
    groupSize: "4-8",
    price: 59,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  },
];

const Experiences = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredExperiences = activeCategory
    ? experiences.filter((exp) => exp.category === activeCategory)
    : experiences;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-accent/10 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-4">
              Curated <span className="gradient-text-gold">Experiences</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Immerse yourself in authentic Kurdish culture through carefully crafted experiences.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              variant={activeCategory === null ? "gold" : "glass"}
              onClick={() => setActiveCategory(null)}
              className="gap-2"
            >
              All Experiences
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "gold" : "glass"}
                onClick={() => setActiveCategory(cat.id)}
                className="gap-2"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 h-full",
                  hoveredId === exp.id && "border-gold/30 shadow-[0_0_40px_hsl(45_60%_53%/0.15)] scale-[1.02]"
                )}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredId === exp.id ? 1.15 : 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground capitalize">
                      {exp.category}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-gold/90 text-deep-dark font-bold">
                      ${exp.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {exp.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gold" />
                          {exp.groupSize}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        {exp.rating}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredId === exp.id ? 1 : 0, 
                        x: hoveredId === exp.id ? 0 : -10 
                      }}
                      className="absolute bottom-5 right-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-deep-dark" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default Experiences;
