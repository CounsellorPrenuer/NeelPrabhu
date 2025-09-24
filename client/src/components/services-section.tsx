import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, GraduationCap, Briefcase, Users, Compass } from "lucide-react";
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
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">Our Services</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive career guidance solutions tailored for every stage of your journey
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = serviceIcons[service.category as keyof typeof serviceIcons] || GraduationCap;
            
            return (
              <Card key={service.id} className="card-hover bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      {service.category && (
                        <Badge variant="secondary" className="mt-1">
                          {service.category}
                        </Badge>
                      )}
                    </div>
                    {service.price && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{service.price}</div>
                      </div>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-muted-foreground">{service.description}</p>
                  )}
                </CardHeader>
                
                <CardContent>
                  {service.features && Array.isArray(service.features) && (
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => scrollToSection('#contact')}
                    data-testid={`button-service-${service.id}`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => scrollToSection('#contact')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-explore-all-services"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
