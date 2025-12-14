import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Home, Mountain, CreditCard, Check, ChevronRight, Star, Clock, Shield } from "lucide-react";
import { format } from "date-fns";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const popularTours = [
  { id: 1, name: "Erbil Heritage Walk", price: 89, duration: "4 hours", rating: 4.9, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400" },
  { id: 2, name: "Mountain Adventure Trek", price: 199, duration: "Full day", rating: 4.8, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
  { id: 3, name: "Kurdish Cuisine Experience", price: 75, duration: "3 hours", rating: 4.9, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
];

const popularVillas = [
  { id: 1, name: "Mountain View Lodge", price: 350, bedrooms: 4, rating: 4.9, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" },
  { id: 2, name: "Luxury City Penthouse", price: 280, bedrooms: 3, rating: 4.8, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400" },
  { id: 3, name: "Riverside Retreat", price: 420, bedrooms: 5, rating: 4.9, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400" },
];

const Booking = () => {
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<"tour" | "property">("tour");
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [tourDate, setTourDate] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    toast({
      title: "Booking Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your booking.",
    });
    setStep(3);
  };

  const nextStep = () => {
    if (step === 1) {
      if (bookingType === "tour" && !selectedTour) {
        toast({ title: "Please select a tour", variant: "destructive" });
        return;
      }
      if (bookingType === "property" && !selectedVilla) {
        toast({ title: "Please select a property", variant: "destructive" });
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-deep-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-deep-dark to-deep-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4">
              Easy Booking
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Book Your <span className="text-gold">Adventure</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Reserve your dream tour or luxury property in Kurdistan with just a few clicks
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                      step >= s 
                        ? "bg-gold text-deep-dark" 
                        : "bg-charcoal text-muted-foreground border border-border"
                    )}
                    animate={{ scale: step === s ? 1.1 : 1 }}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <div className={cn(
                      "w-16 md:w-24 h-1 mx-2 rounded-full transition-all",
                      step > s ? "bg-gold" : "bg-charcoal"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-5xl mx-auto"
          >
            {step === 1 && (
              <div className="glass-card p-8 rounded-2xl">
                <Tabs defaultValue="tour" onValueChange={(v) => setBookingType(v as "tour" | "property")}>
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-charcoal/50">
                    <TabsTrigger value="tour" className="data-[state=active]:bg-gold data-[state=active]:text-deep-dark">
                      <Mountain className="w-4 h-4 mr-2" />
                      Book a Tour
                    </TabsTrigger>
                    <TabsTrigger value="property" className="data-[state=active]:bg-gold data-[state=active]:text-deep-dark">
                      <Home className="w-4 h-4 mr-2" />
                      Book a Property
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tour" className="space-y-6">
                    {/* Date & Guests Selection */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <Label className="text-foreground mb-2 block">Tour Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left bg-charcoal/50 border-border hover:bg-charcoal">
                              <Calendar className="mr-2 h-4 w-4 text-gold" />
                              {tourDate ? format(tourDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-charcoal border-border" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={tourDate}
                              onSelect={setTourDate}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-foreground mb-2 block">Number of Guests</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="bg-charcoal/50 border-border">
                            <Users className="mr-2 h-4 w-4 text-gold" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-charcoal border-border">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tour Selection */}
                    <Label className="text-foreground mb-4 block text-lg">Select Your Tour</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {popularTours.map((tour) => (
                        <motion.div
                          key={tour.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedTour(tour.id)}
                          className={cn(
                            "relative rounded-xl overflow-hidden cursor-pointer transition-all border-2",
                            selectedTour === tour.id 
                              ? "border-gold shadow-lg shadow-gold/20" 
                              : "border-transparent"
                          )}
                        >
                          <img src={tour.image} alt={tour.name} className="w-full h-40 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-semibold text-foreground">{tour.name}</h3>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {tour.duration}
                              </div>
                              <span className="text-gold font-bold">${tour.price}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm mt-1">
                              <Star className="w-3 h-3 fill-gold text-gold" />
                              <span className="text-gold">{tour.rating}</span>
                            </div>
                          </div>
                          {selectedTour === tour.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-deep-dark" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="property" className="space-y-6">
                    {/* Date Selection */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <Label className="text-foreground mb-2 block">Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left bg-charcoal/50 border-border hover:bg-charcoal">
                              <Calendar className="mr-2 h-4 w-4 text-gold" />
                              {checkIn ? format(checkIn, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-charcoal border-border" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-foreground mb-2 block">Check-out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left bg-charcoal/50 border-border hover:bg-charcoal">
                              <Calendar className="mr-2 h-4 w-4 text-gold" />
                              {checkOut ? format(checkOut, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-charcoal border-border" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={checkOut}
                              onSelect={setCheckOut}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label className="text-foreground mb-2 block">Guests</Label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="bg-charcoal/50 border-border">
                            <Users className="mr-2 h-4 w-4 text-gold" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-charcoal border-border">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Property Selection */}
                    <Label className="text-foreground mb-4 block text-lg">Select Your Property</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {popularVillas.map((villa) => (
                        <motion.div
                          key={villa.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedVilla(villa.id)}
                          className={cn(
                            "relative rounded-xl overflow-hidden cursor-pointer transition-all border-2",
                            selectedVilla === villa.id 
                              ? "border-gold shadow-lg shadow-gold/20" 
                              : "border-transparent"
                          )}
                        >
                          <img src={villa.image} alt={villa.name} className="w-full h-40 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/50 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-semibold text-foreground">{villa.name}</h3>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Home className="w-3 h-3" />
                                {villa.bedrooms} Bedrooms
                              </div>
                              <span className="text-gold font-bold">${villa.price}<span className="text-xs text-muted-foreground">/night</span></span>
                            </div>
                            <div className="flex items-center gap-1 text-sm mt-1">
                              <Star className="w-3 h-3 fill-gold text-gold" />
                              <span className="text-gold">{villa.rating}</span>
                            </div>
                          </div>
                          {selectedVilla === villa.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-deep-dark" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-8">
                  <Button variant="gold" size="lg" onClick={nextStep}>
                    Continue to Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="glass-card p-8 rounded-2xl">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Guest Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground mb-2 block">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-charcoal/50 border-border focus:border-gold"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground mb-2 block">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-charcoal/50 border-border focus:border-gold"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground mb-2 block">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-charcoal/50 border-border focus:border-gold"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground mb-2 block">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-charcoal/50 border-border focus:border-gold"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="specialRequests" className="text-foreground mb-2 block">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      className="bg-charcoal/50 border-border focus:border-gold min-h-[100px]"
                      placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="mt-8 p-6 rounded-xl bg-charcoal/50 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{bookingType === "tour" ? "Tour" : "Property"}</span>
                      <span className="text-foreground">
                        {bookingType === "tour" 
                          ? popularTours.find(t => t.id === selectedTour)?.name 
                          : popularVillas.find(v => v.id === selectedVilla)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Date</span>
                      <span className="text-foreground">
                        {bookingType === "tour" 
                          ? (tourDate ? format(tourDate, "PPP") : "Not selected")
                          : (checkIn && checkOut ? `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d")}` : "Not selected")}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Guests</span>
                      <span className="text-foreground">{guests}</span>
                    </div>
                    <div className="border-t border-border my-4" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-gold">
                        ${bookingType === "tour" 
                          ? (popularTours.find(t => t.id === selectedTour)?.price || 0) * parseInt(guests)
                          : popularVillas.find(v => v.id === selectedVilla)?.price || 0}
                        {bookingType === "property" && <span className="text-sm text-muted-foreground">/night</span>}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="gold" size="lg" onClick={handleSubmit}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 rounded-2xl text-center"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-gold" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Thank you for booking with Vikurdistan. We've sent a confirmation email with all the details.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gold" onClick={() => window.location.href = "/"}>
                    Back to Home
                  </Button>
                  <Button variant="outline" onClick={() => { setStep(1); setSelectedTour(null); setSelectedVilla(null); }}>
                    Make Another Booking
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-5 h-5 text-gold" />
                    <span className="text-sm">Secure Booking</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-5 h-5 text-gold" />
                    <span className="text-sm">Best Price Guarantee</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Booking;
