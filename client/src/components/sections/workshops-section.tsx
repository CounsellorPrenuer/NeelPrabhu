import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, Users, Building, Calendar, Clock, MapPin } from "lucide-react";
import type { Workshop } from "@shared/schema";

export default function WorkshopsSection() {
  const { data: workshops = [], isLoading, error } = useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
  });

  // Fallback workshops for demonstration
  const fallbackWorkshops = [
    {
      id: "1",
      title: "Career Awareness Program for Class 10-12 Students",
      description: "Discover your strengths, explore career options, and make informed decisions about your academic future.",
      date: new Date("2025-03-15T10:00:00"),
      duration: "2 hours",
      targetAudience: "Students",
      price: "2999",
      maxParticipants: 50,
      registeredCount: 23,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "2", 
      title: "Future-Ready Skills for Professionals",
      description: "AI literacy, digital transformation, and career resilience in the changing job market.",
      date: new Date("2025-03-22T14:00:00"),
      duration: "3 hours",
      targetAudience: "Professionals",
      price: "4999",
      maxParticipants: 30,
      registeredCount: 18,
      isActive: true,
      createdAt: new Date()
    },
    {
      id: "3",
      title: "Parent's Guide to Supporting Career Decisions",
      description: "Learn how to guide your children effectively through career planning and decision-making.",
      date: new Date("2025-03-29T11:00:00"),
      duration: "2 hours",
      targetAudience: "Parents",
      price: "1999",
      maxParticipants: 40,
      registeredCount: 32,
      isActive: true,
      createdAt: new Date()
    }
  ];

  const displayWorkshops = workshops.length > 0 ? workshops : fallbackWorkshops;

  const handleWorkshopRegistration = (workshopId: string) => {
    // This would integrate with the workshop registration system
    console.log("Registering for workshop:", workshopId);
  };

  if (error) {
    console.error("Error loading workshops:", error);
  }

  return (
    <section id="workshops" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Workshops & Seminars</h2>
          <p className="text-xl text-muted-foreground">
            High-impact sessions designed for institutions and corporates to empower students, parents, and professionals with future-ready skills.
          </p>
        </div>

        {/* Workshop Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-muted/50 border-none">
            <CardContent className="p-8 text-center">
              <School className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">For Schools & Colleges</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Stream selection guidance workshops</li>
                <li>• Industry awareness sessions</li>
                <li>• Study-abroad preparation seminars</li>
                <li>• Soft skills development programs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-none">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">For Parents</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Understanding careers of the future</li>
                <li>• How to guide children effectively</li>
                <li>• Supporting career decisions</li>
                <li>• Creating supportive environments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-none">
            <CardContent className="p-8 text-center">
              <Building className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-4">For Corporates</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Employee engagement workshops</li>
                <li>• Career growth seminars</li>
                <li>• Leadership development programs</li>
                <li>• Employee wellbeing initiatives</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Workshops */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Upcoming Workshops</h3>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading workshops...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayWorkshops.map((workshop, index) => (
                  <Card key={workshop.id} className="border hover:shadow-md transition-shadow" data-testid={`workshop-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{workshop.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {workshop.targetAudience}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{workshop.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(workshop.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{workshop.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>Online + On-site</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">₹{parseInt(workshop.price).toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">
                              {workshop.registeredCount}/{workshop.maxParticipants || 'Unlimited'} registered
                            </div>
                          </div>
                          <Button
                            onClick={() => handleWorkshopRegistration(workshop.id)}
                            className="bg-primary hover:bg-primary/90"
                            data-testid={`button-register-workshop-${index}`}
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Custom Workshop CTA */}
            <div className="mt-8 text-center pt-8 border-t">
              <p className="text-muted-foreground mb-4">Looking for a custom workshop for your institution or organization?</p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                data-testid="button-request-custom-workshop"
              >
                Request Custom Workshop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
