import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Star, Clock, Users, Heart, Sparkles, Filter, Grid, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
    category: "adventure",
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
    category: "culture",
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
    category: "nature",
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
    category: "culture",
  },
  {
    id: 5,
    title: "Snow Adventure in Halgurd",
    location: "Halgurd Mountain",
    duration: "3 Days",
    groupSize: "6-8",
    price: 899,
    rating: 4.7,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
    badge: null,
    category: "adventure",
  },
  {
    id: 6,
    title: "Culinary Journey",
    location: "Multiple Cities",
    duration: "4 Days",
    groupSize: "4-8",
    price: 1099,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    badge: "NEW",
    category: "food",
  },
];

const categories = ["All", "Adventure", "Culture", "Nature", "Food"];

const Tours = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [likedTours, setLikedTours] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedTours((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                            tour.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-background to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-4">
              Discover <span className="gradient-text-gold">Kurdistan Tours</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              From mountain adventures to cultural immersions, find your perfect journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="glass"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "gold" : "glass"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "gold" : "glass"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Extended Filters */}
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-border/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={2000}
                      step={50}
                      className="mt-2"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">{filteredTours.length}</span> tours found
            </p>
          </div>

          {/* Tours Grid */}
          <div className={cn(
            "grid gap-6",
            viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(45_60%_53%/0.15)]",
                  viewMode === "list" && "flex"
                )}
              >
                {/* Image */}
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === "grid" ? "h-64" : "w-80 h-full"
                )}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {tour.badge && (
                    <Badge className={cn(
                      "absolute top-4 left-4 font-semibold",
                      tour.badge === "HOT" && "bg-destructive",
                      tour.badge === "NEW" && "bg-blue-accent",
                      tour.badge === "LIMITED" && "bg-gold text-deep-dark"
                    )}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      {tour.badge}
                    </Badge>
                  )}

                  <motion.button
                    onClick={() => toggleLike(tour.id)}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                      likedTours.includes(tour.id) 
                        ? "bg-destructive text-foreground" 
                        : "bg-card/80 text-foreground hover:bg-card"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", likedTours.includes(tour.id) && "fill-current")} />
                  </motion.button>
                </div>

                {/* Content */}
                <div className={cn("p-6", viewMode === "list" && "flex-1")}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {tour.location}
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

                  <Button variant="gold" className="w-full mt-4">
                    View Details
                  </Button>
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

export default Tours;
