import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users, School, Building, BookOpen, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection, MotionDiv, MotionCard, MotionStagger, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/components/ui/motion";
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
      <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background to-background-alt relative overflow-hidden">
        <div className="container-responsive">
          <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={fadeInUp}>
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </MotionDiv>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </MotionSection>
    );
  }

  const groupedWorkshops = workshops.reduce((acc, workshop) => {
    const category = workshop.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(workshop);
    return acc;
  }, {} as Record<string, Workshop[]>);

  return (
    <MotionSection className="py-20 space-fluid-xl bg-gradient-to-br from-background to-background-alt relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 gradient-accent rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 gradient-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="container-responsive relative z-10">
        <MotionDiv className="max-w-4xl mx-auto text-center mb-16" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <MotionDiv variants={scaleIn} className="mb-6">
            <Badge className="px-6 py-2 bg-accent/10 text-accent border-accent/20 text-sm font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Professional Development
            </Badge>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-6 text-balance" data-testid="workshops-main-heading">
              Transformative Workshops
              <br />
              & Expert Seminars
            </h2>
          </MotionDiv>
          
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              High-impact sessions designed for institutions and corporates to empower students, 
              parents, and professionals with future-ready skills and strategic career insights.
            </p>
          </MotionDiv>
        </MotionDiv>

        {/* Workshop Categories */}
        <MotionStagger stagger={0.2} delay={0.1}>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* Schools & Colleges */}
            <MotionCard 
              className="glass-card p-8 text-center group interactive-lift"
              variants={fadeInLeft}
              whileHover={{ scale: 1.05, y: -10 }}
              data-testid="category-schools"
            >
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow transition-all">
                <School className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-fluid-xl font-bold text-foreground mb-4">For Schools & Colleges</h3>
              <div className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Stream selection guidance workshops",
                  "Industry awareness sessions", 
                  "Study-abroad preparation seminars",
                  "Soft skills development programs",
                  "Career planning workshops"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </MotionCard>

            {/* Parents */}
            <MotionCard 
              className="glass-card p-8 text-center group interactive-lift"
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -10 }}
              data-testid="category-parents"
            >
              <div className="w-20 h-20 gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow transition-all">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-fluid-xl font-bold text-foreground mb-4">For Parents</h3>
              <div className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Understanding careers of the future",
                  "How to guide children effectively",
                  "Career support strategies",
                  "Educational decision making",
                  "Parent-child communication"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-secondary/60 mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </MotionCard>

            {/* Corporates */}
            <MotionCard 
              className="glass-card p-8 text-center group interactive-lift"
              variants={fadeInRight}
              whileHover={{ scale: 1.05, y: -10 }}
              data-testid="category-corporates"
            >
              <div className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow transition-all">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-fluid-xl font-bold text-foreground mb-4">For Corporates</h3>
              <div className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Employee engagement workshops",
                  "Career growth seminars",
                  "Leadership development",
                  "Employee wellbeing initiatives",
                  "Future skills training"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent/60 mt-2 flex-shrink-0"></div>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </MotionCard>
          </div>
        </MotionStagger>

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
        <MotionDiv 
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="glass-card p-10 max-w-3xl mx-auto relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-24 h-24 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-fluid-2xl font-bold text-foreground mb-4">Need a Custom Workshop?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Looking for a tailored workshop for your institution or organization? We create 
                custom programs designed to meet your specific needs and objectives.
              </p>
              <Button
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="gradient-accent text-white hover:opacity-90 px-8 py-4 rounded-xl interactive-scale"
                data-testid="button-request-custom-workshop"
              >
                <Target className="w-5 h-5 mr-2" />
                Request Custom Workshop
              </Button>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
