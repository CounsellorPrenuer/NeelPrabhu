import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, School, Building } from "lucide-react";

const audienceCards = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Choose the right stream, course, and higher education options with confidence.",
  },
  {
    icon: Briefcase,
    title: "For Professionals",
    description: "Navigate career transitions, upskill for the AI era, and unlock growth opportunities.",
  },
  {
    icon: School,
    title: "For Schools & Colleges",
    description: "Enable your students with structured, research-backed career guidance.",
  },
  {
    icon: Building,
    title: "For Corporates",
    description: "Build engaged, future-ready teams through customized workshops and seminars.",
  },
];

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden hero-pattern py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-accent mb-6 animate-fade-in-up">
            Future-Proof Your Career. <br />
            <span className="compass-gradient bg-clip-text text-transparent">
              Shape Your Tomorrow.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            At CareerMentoria, we believe every student and professional deserves clarity, direction, and confidence in their career journey. In an era where AI, automation, and global shifts are transforming the world of work, we help you discover your strengths, align them with opportunities, and build a future-ready career path.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {audienceCards.map((card, index) => (
              <Card key={index} className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 compass-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <card.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button
              onClick={() => scrollToSection('#contact')}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              data-testid="button-book-discovery-call"
            >
              Book Your Free Discovery Call
            </Button>
            <Button
              onClick={() => scrollToSection('#services')}
              size="lg"
              variant="outline"
              className="border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all transform hover:scale-105"
              data-testid="button-explore-services-hero"
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
