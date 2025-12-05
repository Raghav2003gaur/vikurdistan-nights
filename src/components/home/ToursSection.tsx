import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Users, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tours = [
  {
    id: 1,
    title: "Mystical Mountains of Zagros",
    location: "Erbil to Rawanduz",
    duration: "5 Days",
    groupSize: "8-12",
    price: 1299,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    badge: "HOT",
    badgeColor: "bg-destructive",
  },
  {
    id: 2,
    title: "Ancient Citadel Experience",
    location: "Erbil City",
    duration: "3 Days",
    groupSize: "4-8",
    price: 799,
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
    badge: "NEW",
    badgeColor: "bg-blue-accent",
  },
  {
    id: 3,
    title: "Waterfalls & Valleys Trek",
    location: "Gali Ali Beg",
    duration: "4 Days",
    groupSize: "6-10",
    price: 999,
    rating: 5.0,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
    badge: "LIMITED",
    badgeColor: "bg-gold text-deep-dark",
  },
  {
    id: 4,
    title: "Kurdish Village Immersion",
    location: "Sulaymaniyah Region",
    duration: "6 Days",
    groupSize: "4-6",
    price: 1599,
    rating: 4.9,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800&q=80",
    badge: null,
    badgeColor: "",
  },
];

const TourCard = ({ tour, index }: { tour: typeof tours[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500",
        isHovered && "border-gold/30 shadow-[0_0_40px_hsl(45_60%_53%/0.15)]"
      )}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Badge */}
          {tour.badge && (
            <Badge className={cn("absolute top-4 left-4 font-semibold", tour.badgeColor)}>
              <Sparkles className="w-3 h-3 mr-1" />
              {tour.badge}
            </Badge>
          )}

          {/* Like Button */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isLiked ? "bg-destructive text-foreground" : "bg-card/80 text-foreground hover:bg-card"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          </motion.button>

          {/* Glow overlay on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle at 50% 100%, hsl(45 60% 53% / 0.15), transparent 70%)"
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{tour.location}</span>
          </div>
          
          <h3 className="font-playfair text-xl font-semibold text-foreground mb-4 group-hover:text-gold transition-colors">
            {tour.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gold" />
              {tour.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gold" />
              {tour.groupSize}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-2xl font-bold text-foreground">
                ${tour.price}
                <span className="text-sm font-normal text-muted-foreground"> /person</span>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-4 h-4 fill-gold" />
                <span className="font-semibold">{tour.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{tour.reviews} reviews</p>
            </div>
          </div>
        </div>

        {/* Hover CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card to-transparent"
        >
          <Button variant="gold" className="w-full">
            View Details
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ToursSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-medium mb-2"
            >
              Popular Tours
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl font-bold text-foreground"
            >
              Unforgettable Adventures
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="gold-outline" className="gap-2">
              View All Tours
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
