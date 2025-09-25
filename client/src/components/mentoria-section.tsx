import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp, Users, Award, BookOpen } from "lucide-react";

const platformStats = [
  {
    number: "3,50,000+",
    label: "Students and Professionals Mentored",
    icon: Users,
  },
  {
    number: "240+",
    label: "Corporate Partners",
    icon: TrendingUp,
  },
  {
    number: "350+",
    label: "Schools and College Partners",
    icon: Award,
  },
  {
    number: "1000+",
    label: "Hours of Career Webinars",
    icon: BookOpen,
  },
];

const platformFeatures = [
  "Comprehensive psychometric assessments",
  "Expert mentorship network",
  "Industry insights and trends",
  "Continuous learning resources",
  "Personalized career roadmaps",
  "Live webinars with industry experts",
];

export default function MentoriaSection() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Powered by Mentoria's Career Discovery Platform
            </h2>
            <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
              Every CareerMentoria plan includes lifetime access to Mentoria: India's most trusted platform for career discovery, mentorship, and lifelong upskilling.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Interactive Statistics */}
              <div className="grid grid-cols-2 gap-6">
                {platformStats.map((stat, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-accent mb-2 stats-counter">
                        {stat.number}
                      </div>
                      <p className="text-secondary-foreground/80 text-sm leading-tight">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Mentoria - Clutter to Clarity</h3>
                    <p className="text-secondary-foreground/80">Career Discovery Platform</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {platformFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-secondary-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Platform Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Lifetime Access</h4>
                        <p className="text-secondary-foreground/80 text-sm">Comprehensive career resources available 24/7</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Expert Guidance</h4>
                        <p className="text-secondary-foreground/80 text-sm">Regular webinars and mentorship from industry leaders</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Continuous Learning</h4>
                        <p className="text-secondary-foreground/80 text-sm">Stay updated with latest industry trends and skills</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-all"
                  onClick={() => window.open('https://mentoria.com', '_blank')}
                  data-testid="button-explore-mentoria"
                >
                  Explore Mentoria's Comprehensive Career Platform
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
