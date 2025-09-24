import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Receipt, Headphones } from "lucide-react";
import { Service } from "@shared/schema";
import { initiatePayment } from "@/lib/payment";

export default function PricingSection() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const response = await fetch("/api/services?active=true");
      if (!response.ok) throw new Error("Failed to fetch services");
      return response.json();
    },
  });

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

  const studentServices = services.filter(s => s.category === 'student');
  const professionalServices = services.filter(s => s.category === 'professional');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground">
            Tailored packages for students and professionals at every career stage
          </p>
        </div>

        {/* Student Plans */}
        {studentServices.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">🎓</span>
              </div>
              Student Plans
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {studentServices.map((service, index) => (
                <Card
                  key={service.id}
                  className={`card-hover ${index === 0 ? 'border-2 border-primary relative' : ''}`}
                >
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary mt-2">
                      ₹{service.price?.toLocaleString()}
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {service.features && Array.isArray(service.features) && (
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handlePayment(service)}
                      data-testid={`button-choose-${service.id}`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Professional Plans */}
        {professionalServices.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg">💼</span>
              </div>
              Professional Plans
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {professionalServices.map((service) => (
                <Card key={service.id} className="card-hover">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="text-3xl font-bold text-secondary mt-2">
                      ₹{service.price?.toLocaleString()}
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {service.features && Array.isArray(service.features) && (
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      onClick={() => handlePayment(service)}
                      data-testid={`button-choose-${service.id}`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Payment Processing Note */}
        <div className="bg-muted/50 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Secure Payment Processing</span>
          </div>
          <p className="text-muted-foreground mb-4">
            All payments are processed securely through Razorpay. You'll receive a confirmation email and receipt after successful payment.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Receipt className="w-4 h-4 text-primary" />
              <span>Instant receipts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="w-4 h-4 text-primary" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
