import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, School, Building } from "lucide-react";
import { Workshop } from "@shared/schema";

const categoryIcons = {
  schools: School,
  parents: Users,
  corporates: Building,
};

const categoryTitles = {
  schools: "For Schools & Colleges",
  parents: "For Parents",
  corporates: "For Corporates",
};

export default function WorkshopsSection() {
  const { data: workshops = [], isLoading } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
    queryFn: async () => {
      const response = await fetch("/api/workshops?active=true");
      if (!response.ok) throw new Error("Failed to fetch workshops");
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
      <section id="workshops" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading workshops...</div>
          </div>
        </div>
      </section>
    );
  }

  const groupedWorkshops = workshops.reduce((acc, workshop) => {
    const category = workshop.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(workshop);
    return acc;
  }, {} as Record<string, Workshop[]>);

  return (
    <section id="workshops" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-6">Workshops & Seminars</h2>
          <p className="text-xl text-muted-foreground">
            High-impact sessions designed for institutions and corporates to empower students, parents, and professionals with future-ready skills.
          </p>
        </div>

        {/* Workshop Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-muted/50 p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <School className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">For Schools & Colleges</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Stream selection guidance workshops</li>
              <li>• Industry awareness sessions</li>
              <li>• Study-abroad preparation seminars</li>
              <li>• Soft skills development programs</li>
              <li>• Career planning workshops</li>
            </ul>
          </Card>

          <Card className="bg-muted/50 p-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">For Parents</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Understanding careers of the future</li>
              <li>• How to guide children effectively</li>
              <li>• Career support strategies</li>
              <li>• Educational decision making</li>
              <li>• Parent-child communication</li>
            </ul>
          </Card>

          <Card className="bg-muted/50 p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">For Corporates</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Employee engagement workshops</li>
              <li>• Career growth seminars</li>
              <li>• Leadership development</li>
              <li>• Employee wellbeing initiatives</li>
              <li>• Future skills training</li>
            </ul>
          </Card>
        </div>

        {/* Upcoming Workshops */}
        {workshops.length > 0 ? (
          <Card className="bg-primary/5 border border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Upcoming Workshops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {workshops.map((workshop) => {
                const IconComponent = categoryIcons[workshop.category as keyof typeof categoryIcons] || Calendar;
                
                return (
                  <div
                    key={workshop.id}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-card rounded-lg border"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{workshop.title}</h4>
                          {workshop.category && (
                            <Badge variant="secondary" className="text-xs">
                              {categoryTitles[workshop.category as keyof typeof categoryTitles] || workshop.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {workshop.description && (
                        <p className="text-muted-foreground">{workshop.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {workshop.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(workshop.date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {workshop.date && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(workshop.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        )}
                        {workshop.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{workshop.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                      {workshop.price && (
                        <div className="text-right">
                          <div className="text-lg font-semibold text-primary">₹{workshop.price}</div>
                        </div>
                      )}
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => workshop.registrationUrl ? window.open(workshop.registrationUrl, '_blank') : scrollToSection('#contact')}
                        data-testid={`button-register-${workshop.id}`}
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No upcoming workshops scheduled at the moment.</p>
          </div>
        )}

        {/* Custom Workshop CTA */}
        <div className="text-center mt-12">
          <div className="bg-muted/50 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Need a Custom Workshop?</h3>
            <p className="text-muted-foreground mb-6">
              Looking for a tailored workshop for your institution or organization? We can create custom programs to meet your specific needs.
            </p>
            <Button
              size="lg"
              onClick={() => scrollToSection('#contact')}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              data-testid="button-request-custom-workshop"
            >
              Request Custom Workshop
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
