import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingButtons = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Book Now Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onMouseEnter={() => setIsHovered("book")}
        onMouseLeave={() => setIsHovered(null)}
        className={cn(
          "group relative flex items-center justify-center w-14 h-14 rounded-full bg-gold shadow-lg transition-all duration-300",
          "hover:w-auto hover:px-6 hover:shadow-[0_0_30px_hsl(45_60%_53%/0.4)]"
        )}
      >
        <Calendar className="w-6 h-6 text-deep-dark" />
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: isHovered === "book" ? 1 : 0, 
            width: isHovered === "book" ? "auto" : 0,
            marginLeft: isHovered === "book" ? "0.5rem" : 0
          }}
          className="text-deep-dark font-semibold whitespace-nowrap overflow-hidden"
        >
          Book Now
        </motion.span>
      </motion.button>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/9647501234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        onMouseEnter={() => setIsHovered("whatsapp")}
        onMouseLeave={() => setIsHovered(null)}
        className={cn(
          "group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg transition-all duration-300",
          "hover:w-auto hover:px-6 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
        )}
      >
        <MessageCircle className="w-6 h-6 text-foreground" />
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: isHovered === "whatsapp" ? 1 : 0, 
            width: isHovered === "whatsapp" ? "auto" : 0,
            marginLeft: isHovered === "whatsapp" ? "0.5rem" : 0
          }}
          className="text-foreground font-semibold whitespace-nowrap overflow-hidden"
        >
          Chat with us
        </motion.span>
      </motion.a>
    </div>
  );
};
