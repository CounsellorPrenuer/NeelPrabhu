import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, GraduationCap, Briefcase, Users, Compass, ArrowRight, Sparkles } from "lucide-react";
import { MotionSection, MotionDiv, MotionStagger, MotionCard, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/components/ui/motion";
import { Service } from "@shared/schema";

const serviceIcons = {
  student: GraduationCap,
  professional: Briefcase,
  workshop: Users,
  mentorship: Compass,
};

export default function ServicesSection() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const response = await fetch("/api/services?active=true");
      if (!response.ok) throw new Error("Failed to fetch services");
      return response.json();
    },
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background to-background-alt">
        <div className="container-responsive">
          <MotionDiv className="max-w-3xl mx-auto text-center mb-16" variants={fadeInUp}>
            <Skeleton className="h-12 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </MotionDiv>
          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </MotionSection>
    );
  }

  return (
    <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background to-background-alt relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="container-responsive relative z-10">
        <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <MotionDiv variants={scaleIn} className="mb-6">
            <Badge className="px-6 py-2 bg-primary/10 text-primary border-primary/20 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Expert Career Services
            </Badge>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-6 text-balance" data-testid="services-main-heading">
              Comprehensive Career Guidance
              <br />
              Tailored for You
            </h2>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              From students choosing their first career path to professionals pivoting to future-ready roles, 
              we provide expert guidance backed by 20+ years of experience and proven methodologies.
            </p>
          </MotionDiv>
        </MotionDiv>

        <MotionStagger stagger={0.2} delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.category as keyof typeof serviceIcons] || GraduationCap;
              const features = Array.isArray(service.features) ? service.features as string[] : [];
              
              return (
                <MotionDiv key={service.id} variants={index % 2 === 0 ? fadeInLeft : fadeInRight}>
                  <MotionCard 
                    className="glass-card p-8 rounded-2xl h-full group interactive-lift"
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Service Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-fluid-xl font-bold text-foreground mb-2">{service.name}</h3>
                          {service.category && (
                            <Badge variant="outline" className="text-xs capitalize border-primary/20 text-primary">
                              {service.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {service.price && (
                        <div className="text-right">
                          <div className="text-fluid-2xl font-bold text-primary">
                            ₹{service.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">One-time</div>
                        </div>
                      )}
                    </div>

                    {/* Service Description */}
                    {service.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
                        {service.description}
                      </p>
                    )}
                    
                    {/* Features List */}
                    {features.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start space-x-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA Button */}
                    <Button
                      className="w-full gradient-primary text-white hover:opacity-90 rounded-xl py-3 font-semibold interactive-scale group"
                      onClick={() => scrollToSection('#contact')}
                      data-testid={`button-service-${service.id}`}
                    >
                      Get Started Today
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MotionCard>
                </MotionDiv>
              );
            })}
          </div>
        </MotionStagger>

        {/* Bottom CTA Section */}
        <MotionDiv 
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-fluid-xl font-bold text-foreground mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a free discovery call to discuss your goals and find the perfect career guidance solution.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 px-8 py-4 rounded-xl interactive-scale"
              onClick={() => scrollToSection('#contact')}
              data-testid="button-free-consultation"
            >
              Book Free Consultation
            </Button>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
