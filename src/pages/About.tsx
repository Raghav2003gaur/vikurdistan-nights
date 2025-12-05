import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";

const timeline = [
  { year: "7000 BCE", title: "Ancient Settlements", description: "First human settlements in the Kurdish highlands" },
  { year: "2400 BCE", title: "Akkadian Period", description: "References to Kurdish ancestors in Mesopotamian texts" },
  { year: "612 BCE", title: "Fall of Assyria", description: "Medes, ancestors of Kurds, conquer Nineveh" },
  { year: "1170 CE", title: "Saladin's Era", description: "Kurdish leader Saladin unites the region" },
  { year: "1991", title: "Kurdistan Region", description: "Establishment of autonomous Kurdistan Region" },
  { year: "Today", title: "Modern Kurdistan", description: "A thriving destination welcoming visitors worldwide" },
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

const About = () => {
  const [activePin, setActivePin] = useState<number | null>(null);

  const mapPins = [
    { id: 1, x: 45, y: 35, label: "Erbil", info: "Capital city, ancient citadel" },
    { id: 2, x: 55, y: 45, label: "Sulaymaniyah", info: "Cultural hub, museums" },
    { id: 3, x: 35, y: 30, label: "Duhok", info: "Mountain gateway, nature" },
    { id: 4, x: 50, y: 25, label: "Rawanduz", info: "Canyon capital, adventure" },
  ];

  return (
    <main className="min-h-screen bg-background film-grain">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-dark via-deep-dark/90 to-deep-dark" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-7xl font-bold text-foreground mb-6">
              <TypewriterText text="Discover Kurdistan" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A land where ancient history meets breathtaking nature, where warm hospitality 
              welcomes every traveler, and where adventure awaits at every turn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, value: "40,643", label: "km² Area" },
              { icon: Users, value: "5.2M", label: "Population" },
              { icon: Calendar, value: "7,000+", label: "Years of History" },
              { icon: Award, value: "UNESCO", label: "Heritage Sites" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="font-playfair text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
              Explore the <span className="gradient-text-gold">Region</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on the pins to discover major destinations across Kurdistan.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden glass-card">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
              alt="Kurdistan Map"
              className="w-full h-full object-cover opacity-50"
            />
            
            {/* Map Pins */}
            {mapPins.map((pin) => (
              <motion.button
                key={pin.id}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                className="absolute"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  activePin === pin.id ? "bg-gold" : "bg-gold/60 hover:bg-gold"
                }`}>
                  <MapPin className="w-4 h-4 text-deep-dark" />
                </div>
                
                {activePin === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-48 p-4 rounded-lg bg-card border border-border/50 shadow-xl z-10"
                  >
                    <h4 className="font-semibold text-foreground mb-1">{pin.label}</h4>
                    <p className="text-sm text-muted-foreground">{pin.info}</p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-4">
              A Journey Through <span className="gradient-text-gold">Time</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "justify-end pr-[52%]" : "justify-start pl-[52%]"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-background" />
                
                {/* Content */}
                <div className={`glass-card p-6 max-w-sm ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <span className="text-gold font-semibold">{item.year}</span>
                  <h3 className="font-playfair text-xl font-bold text-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
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

export default About;
