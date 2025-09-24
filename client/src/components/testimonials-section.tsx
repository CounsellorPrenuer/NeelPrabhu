import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials?active=true");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">
            🌟 What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories of transformation and clarity from students, professionals, and institutions
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="card-hover bg-card">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        {testimonial.role && (
                          <span className="text-sm text-muted-foreground">• {testimonial.role}</span>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No testimonials available at the moment.</p>
          </div>
        )}

        {/* Success Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <Card className="bg-card p-6">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Client Satisfaction Rate</p>
          </Card>
          <Card className="bg-card p-6">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <p className="text-muted-foreground">Lives Transformed</p>
          </Card>
          <Card className="bg-card p-6">
            <div className="text-3xl font-bold text-primary mb-2">200+</div>
            <p className="text-muted-foreground">Institutional Partners</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
