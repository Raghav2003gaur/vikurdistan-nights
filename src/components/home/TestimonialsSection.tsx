import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Kurdistan exceeded all my expectations. The mountains are breathtaking, the food is incredible, and the people are so welcoming. Vikurdistan made everything seamless.",
    rating: 5,
    location: "Los Angeles, USA",
  },
  {
    id: 2,
    name: "Marco Rossi",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "I've traveled to 50+ countries, and Kurdistan is now in my top 5. The landscapes are perfect for photography, and the local guides know all the hidden spots.",
    rating: 5,
    location: "Milan, Italy",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Adventure Enthusiast",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The Zagros mountain trek was life-changing. Our guide was incredibly knowledgeable about the history and culture. Already planning my return trip!",
    rating: 5,
    location: "London, UK",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-medium mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-foreground"
          >
            Stories from Travelers
          </motion.h2>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 text-center"
              >
                {/* Quote Icon */}
                <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-gold" />
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} · {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="glass"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-gold"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="glass"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
