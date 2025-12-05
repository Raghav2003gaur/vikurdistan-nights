import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Wifi, Car, Utensils, Snowflake, Bath, Bed, Search, Heart } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
    featured: true,
  },
  {
    id: 2,
    name: "Riverside Modern Retreat",
    location: "Rawanduz Canyon",
    price: 380,
    rating: 4.8,
    beds: 3,
    baths: 2,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen"],
    featured: false,
  },
  {
    id: 3,
    name: "Traditional Kurdish Estate",
    location: "Sulaymaniyah",
    price: 520,
    rating: 5.0,
    beds: 5,
    baths: 4,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
    featured: true,
  },
  {
    id: 4,
    name: "Hilltop Glass Villa",
    location: "Duhok Mountains",
    price: 680,
    rating: 4.9,
    beds: 4,
    baths: 3,
    sqft: 3800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
    featured: false,
  },
  {
    id: 5,
    name: "Waterfront Paradise",
    location: "Dukan Lake",
    price: 420,
    rating: 4.7,
    beds: 3,
    baths: 2,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen"],
    featured: false,
  },
  {
    id: 6,
    name: "Alpine Chalet",
    location: "Choman District",
    price: 550,
    rating: 4.8,
    beds: 4,
    baths: 3,
    sqft: 3400,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    amenities: ["wifi", "parking", "kitchen", "ac"],
    featured: true,
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  kitchen: Utensils,
  ac: Snowflake,
};

const Villas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [likedVillas, setLikedVillas] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedVillas((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const filteredVillas = villas.filter((villa) =>
    villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    villa.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-4">
              Luxury <span className="gradient-text-gold">Villas & Stays</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Handpicked properties offering exceptional comfort amidst Kurdistan's natural beauty.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-secondary/50 border-border/50 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVillas.map((villa, index) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(villa.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500",
                  hoveredId === villa.id && "border-gold/30 shadow-[0_0_50px_hsl(45_60%_53%/0.2)]"
                )}>
                  {/* Image with Video-like hover effect */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredId === villa.id ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    
                    {/* Featured Badge */}
                    {villa.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-deep-dark text-xs font-semibold">
                        FEATURED
                      </div>
                    )}

                    {/* Like Button */}
                    <motion.button
                      onClick={() => toggleLike(villa.id)}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        likedVillas.includes(villa.id) 
                          ? "bg-destructive text-foreground" 
                          : "bg-card/80 text-foreground hover:bg-card"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", likedVillas.includes(villa.id) && "fill-current")} />
                    </motion.button>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50">
                      <span className="text-gold font-bold text-xl">${villa.price}</span>
                      <span className="text-muted-foreground text-sm"> /night</span>
                    </div>

                    {/* Glow overlay on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: hoveredId === villa.id ? 1 : 0 }}
                      style={{
                        background: "radial-gradient(circle at 50% 100%, hsl(45 60% 53% / 0.2), transparent 60%)"
                      }}
                    />
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

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-gold" />
                        {villa.beds} Beds
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-gold" />
                        {villa.baths} Baths
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-foreground font-semibold">{villa.rating}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-3 mb-4">
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

                    <Button variant="gold-outline" className="w-full">
                      View Property
                    </Button>
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

export default Villas;
