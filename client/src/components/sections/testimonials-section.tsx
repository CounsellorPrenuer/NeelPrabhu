import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Fallback testimonials for initial load
  const fallbackTestimonials = [
    {
      id: "1",
      name: "Riya Sharma",
      role: "Class 12 Student",
      content: "Before meeting Neel sir, I was completely confused about whether to choose science or commerce. The psychometric test and his clear guidance helped me decide confidently. Today, I'm pursuing Computer Science with clarity and excitement for the future.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "2",
      name: "Meera Joshi",
      role: "Parent of Class 10 Student",
      content: "As parents, we were anxious about guiding our daughter's career. Neel's counselling sessions gave us a structured path and relieved our stress. We now feel confident about supporting her decisions.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "3",
      name: "Sneha Iyer",
      role: "HR → People Analytics Professional",
      content: "The transition from traditional HR to an analytics-driven role felt impossible until I got Neel's guidance. The counselling sessions helped me identify transferable skills and position myself for future-ready opportunities.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "4",
      name: "Dr. Rajesh Kumar",
      role: "Principal, St. Mary's High School",
      content: "The workshops conducted by CareerMentoria for our students and parents were extremely impactful. Students left with clarity on career streams, while parents appreciated the scientific approach. We look forward to more collaborations.",
      rating: 5,
      isActive: true,
      createdAt: new Date()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (error) {
    console.error("Error loading testimonials:", error);
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">🌟 What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">
            Real stories of transformation and clarity from students, professionals, and institutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="bg-card shadow-lg hover:shadow-xl transition-shadow" data-testid={`testimonial-${index}`}>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
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

        {/* Testimonial Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2 stats-counter" data-testid="stat-satisfaction">98%</div>
            <p className="text-muted-foreground">Client Satisfaction Rate</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2 stats-counter" data-testid="stat-lives-transformed">5000+</div>
            <p className="text-muted-foreground">Lives Transformed</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2 stats-counter" data-testid="stat-institutional-partners">200+</div>
            <p className="text-muted-foreground">Institutional Partners</p>
          </div>
        </div>
      </div>
    </section>
  );
}
