import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronLeft, ChevronRight, Quote, Users, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection, MotionDiv, MotionCard, MotionStagger, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/components/ui/motion";
import { Testimonial } from "@shared/schema";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials?active=true");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json();
    },
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (isLoading) {
    return (
      <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background via-background-alt to-background relative overflow-hidden">
        <div className="container-responsive">
          <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={fadeInUp}>
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </MotionDiv>
          <div className="relative">
            <Skeleton className="h-80 w-full max-w-4xl mx-auto rounded-3xl" />
            <div className="flex justify-center mt-8 space-x-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-3 h-3 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>
    );
  }

  return (
    <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background via-background-alt to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 gradient-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 gradient-primary rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-responsive relative z-10">
        <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <MotionDiv variants={scaleIn} className="mb-6">
            <Badge className="px-6 py-2 bg-primary/10 text-primary border-primary/20 text-sm font-medium">
              <Users className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-6 text-balance" data-testid="testimonials-main-heading">
              Transforming Lives Through
              <br />
              Expert Guidance
            </h2>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Real stories of transformation and clarity from students, professionals, and institutions 
              who discovered their true potential with our personalized career guidance.
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 ? (
          <MotionDiv 
            className="relative max-w-5xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                data-testid="testimonials-carousel"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      className="glass-card p-12 mx-auto relative group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-8 left-8 w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center opacity-20">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="text-center relative z-10">
                        <blockquote className="text-fluid-xl text-foreground font-medium leading-relaxed mb-8 text-pretty max-w-3xl mx-auto">
                          "{testimonial.content}"
                        </blockquote>
                        
                        {/* Rating Stars */}
                        <div className="flex justify-center space-x-1 mb-6">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          ))}
                        </div>
                        
                        {/* Author Info */}
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                            <span className="text-xl font-bold text-white">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-left">
                            <h4 className="text-fluid-lg font-bold text-foreground">{testimonial.name}</h4>
                            {testimonial.role && (
                              <p className="text-muted-foreground text-sm capitalize">{testimonial.role}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevSlide}
                className="w-12 h-12 rounded-full border-primary/20 hover:bg-primary/10 interactive-scale"
                data-testid="testimonials-prev-button"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dot Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary scale-125' 
                        : 'bg-primary/20 hover:bg-primary/40'
                    }`}
                    data-testid={`testimonials-dot-${index}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextSlide}
                className="w-12 h-12 rounded-full border-primary/20 hover:bg-primary/10 interactive-scale"
                data-testid="testimonials-next-button"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Progress Indicator */}
            {isAutoPlaying && testimonials.length > 1 && (
              <div className="mt-4 h-1 bg-primary/10 rounded-full overflow-hidden mx-auto max-w-xs">
                <div 
                  className="h-full bg-primary transition-all duration-100 ease-linear"
                  style={{ 
                    width: `${((Date.now() % 5000) / 5000) * 100}%`,
                    animation: 'progress 5s linear infinite'
                  }}
                />
              </div>
            )}
          </MotionDiv>
        ) : (
          <MotionDiv 
            className="text-center py-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
          >
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <p className="text-muted-foreground">No testimonials available at the moment.</p>
            </div>
          </MotionDiv>
        )}

        {/* Success Stats */}
        <MotionStagger stagger={0.2} delay={0.4}>
          <div className="mt-20 grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <MotionCard 
              className="glass-card p-8 group interactive-lift"
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid="stat-satisfaction"
            >
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-fluid-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground font-medium">Client Satisfaction Rate</p>
            </MotionCard>
            
            <MotionCard 
              className="glass-card p-8 group interactive-lift"
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid="stat-lives"
            >
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-fluid-3xl font-bold text-secondary mb-2">5000+</div>
              <p className="text-muted-foreground font-medium">Lives Transformed</p>
            </MotionCard>
            
            <MotionCard 
              className="glass-card p-8 group interactive-lift"
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
              data-testid="stat-partners"
            >
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-fluid-3xl font-bold text-accent mb-2">200+</div>
              <p className="text-muted-foreground font-medium">Institutional Partners</p>
            </MotionCard>
          </div>
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
