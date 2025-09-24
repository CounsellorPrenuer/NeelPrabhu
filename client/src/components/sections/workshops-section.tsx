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

  // Get category display name
  const getCategoryDisplayName = (category: string | null) => {
    switch(category) {
      case 'schools': return 'Students';
      case 'parents': return 'Parents';
      case 'corporates': return 'Corporates';
      default: return 'General';
    }
  };

  // Display actual workshops from database or show empty state
  const displayWorkshops = workshops;

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
            ) : displayWorkshops.length > 0 ? (
              <div className="space-y-6">
                {displayWorkshops.map((workshop, index) => (
                  <Card key={workshop.id} className="border hover:shadow-md transition-shadow" data-testid={`workshop-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-semibold text-foreground">{workshop.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {getCategoryDisplayName(workshop.category)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{workshop.description || "Workshop details will be provided upon registration."}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{workshop.date ? new Date(workshop.date).toLocaleDateString() : "Date TBD"}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>2-3 hours</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{workshop.location || "Online + On-site"}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">
                              {workshop.price ? `₹${workshop.price.toLocaleString()}` : "Free"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Limited seats available
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
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming workshops available at the moment.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for new workshop announcements!</p>
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
