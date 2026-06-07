import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, GraduationCap, ArrowRight } from "lucide-react";
import { MotionSection, MotionDiv, fadeInUp } from "@/components/ui/motion";
import { fetchServices } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";

export default function ServicesSection() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["sanity-services"],
    queryFn: fetchServices,
  });

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading || services.length === 0) return null;

  return (
    <MotionSection id="services" className="py-20 bg-background">
      <div className="container-responsive">
        <MotionDiv className="max-w-3xl mx-auto text-center mb-12" variants={fadeInUp}>
          <Badge className="mb-4">Expert Career Services</Badge>
          <h2 className="text-fluid-3xl font-bold text-foreground mb-4">
            Comprehensive Career Guidance
          </h2>
          <p className="text-muted-foreground">
            Services you can edit anytime in Sanity Studio — titles, features, and images.
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service) => {
            const imageUrl = urlFor(service.image, { width: 600, height: 320 });
            return (
              <Card key={service._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={service.image?.alt || service.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      {service.subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{service.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button className="w-full" onClick={() => scrollToSection("#contact")}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
