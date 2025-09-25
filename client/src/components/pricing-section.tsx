import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Receipt, Headphones, GraduationCap, Briefcase } from "lucide-react";
import { Service } from "@shared/schema";
import { initiatePayment } from "@/lib/payment";
import { MotionDiv, fadeInUp } from "@/components/ui/motion"

export default function PricingSection() {
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
  
  const handlePayment = async (service: Service) => {
    try {
      await initiatePayment({
        serviceId: service.id,
        customerName: "",
        customerEmail: "",
        customerPhone: "",
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading pricing plans...</div>
          </div>
        </div>
      </section>
    );
  }

  // Sort services to show most popular first within each category (defensive copy)
  const sortedServices = [...services].sort((a, b) => {
    // First sort by category (student first, then professional)
    if (a.category !== b.category) {
      if (a.category === 'student') return -1;
      if (b.category === 'student') return 1;
    }
    // Then sort by name to ensure consistent ordering
    return a.name.localeCompare(b.name);
  });

  const getServiceIcon = (category: string | null) => {
    return category === 'student' ? GraduationCap : Briefcase;
  };

  const getServiceBadge = (category: string | null) => {
    return category === 'student' 
      ? { label: '🎓 For Students', className: 'bg-primary/10 text-primary border-primary/20' }
      : { label: '💼 For Professionals', className: 'bg-secondary/10 text-secondary border-secondary/20' };
  };

  const getButtonStyling = (category: string | null) => {
    return category === 'student'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
  };

  const getCheckIconColor = (category: string | null) => {
    return category === 'student' ? 'text-primary' : 'text-secondary';
  };

  const getPriceColor = (category: string | null) => {
    return category === 'student' ? 'text-primary' : 'text-secondary';
  };

  // Robust popular plan detection - first service in each category
  const getIsPopular = (service: Service, index: number, services: Service[]) => {
    const category = service.category;
    return services.findIndex(s => s.category === category) === index;
  };

  return (
    <section className="py-20 bg-background" data-testid="pricing-section">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6" data-testid="pricing-main-heading">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground">
            Tailored packages for students and professionals at every career stage
          </p>
        </div>

        {/* Unified Plans Grid */}
        {sortedServices.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            {sortedServices.map((service, index) => {
              const IconComponent = getServiceIcon(service.category);
              const badge = getServiceBadge(service.category);
              const isPopular = getIsPopular(service, index, sortedServices);
              
              return (
                <Card
                  key={service.id}
                  className={`card-hover relative ${isPopular ? 'border-2 border-primary shadow-lg scale-105' : ''}`}
                  data-testid={`plan-card-${service.id}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground shadow-md">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    {/* Service Category Badge */}
                    <div className="mb-4">
                      <Badge className={`${badge.className} text-xs font-medium`}>
                        {badge.label}
                      </Badge>
                    </div>
                    
                    {/* Service Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    <CardTitle className="text-xl mb-2" data-testid={`plan-title-${service.id}`}>
                      {service.name}
                    </CardTitle>
                    
                    <div className={`text-3xl font-bold mt-2 ${getPriceColor(service.category)}`}>
                      ₹{service.price?.toLocaleString()}
                    </div>
                    
                    {service.description && (
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Features List */}
                    {service.features && Array.isArray(service.features) && (
                      <div className="space-y-3 mb-8">
                        {(service.features as string[]).map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className={`w-4 h-4 mt-1 flex-shrink-0 ${getCheckIconColor(service.category)}`} />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {String(feature)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA Button */}
                    <Button
                      className={`w-full ${getButtonStyling(service.category)} rounded-xl h-11 font-semibold`}
                      onClick={() => handlePayment(service)}
                      data-testid={`button-choose-${service.id}`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-muted/50 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-muted-foreground">No pricing plans available at the moment.</p>
            </div>
          </div>
        )}
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
              className="border-primary/20 px-8 py-4 rounded-xl interactive-scale"
              onClick={() => scrollToSection('#contact')}
              data-testid="button-free-consultation"
            >
              Book Free Consultation
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}