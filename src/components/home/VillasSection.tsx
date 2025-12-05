import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, MapPin, Wifi, Car, Utensils, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const villas = [
  {
    id: 1,
    name: "Mountain View Luxury Villa",
    location: "Shaqlawa, Erbil",
    price: 450,
    rating: 4.9,
    beds: 4,
    baths: 3,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
  },
  {
    id: 2,
    name: "Riverside Modern Retreat",
    location: "Rawanduz Canyon",
    price: 380,
    rating: 4.8,
    beds: 3,
    baths: 2,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen"],
  },
  {
    id: 3,
    name: "Traditional Kurdish Estate",
    location: "Sulaymaniyah",
    price: 520,
    rating: 5.0,
    beds: 5,
    baths: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
  },
  {
    id: 4,
    name: "Hilltop Glass Villa",
    location: "Duhok Mountains",
    price: 680,
    rating: 4.9,
    beds: 4,
    baths: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  kitchen: Utensils,
  ac: Snowflake,
};

export const VillasSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-charcoal">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-medium mb-2"
            >
              Luxury Stays
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-playfair text-4xl md:text-5xl font-bold text-foreground"
            >
              Exceptional Villas
            </motion.h2>
          </div>
          <div className="flex gap-3">
            <Button
              variant="glass"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="glass"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {villas.map((villa, index) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-[350px] md:w-[400px] snap-start group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(45_60%_53%/0.15)]">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border/50">
                    <span className="text-gold font-bold">${villa.price}</span>
                    <span className="text-muted-foreground text-sm"> /night</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {villa.location}
                  </div>

                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-4 group-hover:text-gold transition-colors">
                    {villa.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{villa.beds} Beds</span>
                      <span>{villa.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-semibold text-foreground">{villa.rating}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-3">
                    {villa.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <div
                          key={amenity}
                          className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
