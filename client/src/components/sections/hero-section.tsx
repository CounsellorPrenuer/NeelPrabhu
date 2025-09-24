import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, School, Building } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden hero-pattern py-20 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 fade-in">
            Future-Proof Your Career. <br />
            <span className="compass-gradient bg-clip-text text-transparent">Shape Your Tomorrow.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto fade-in">
            At CareerMentoria, we believe every student and professional deserves clarity, direction, and confidence in their career journey. In an era where AI, automation, and global shifts are transforming the world of work, we help you discover your strengths, align them with opportunities, and build a future-ready career path.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border card-hover" data-testid="card-students">
              <GraduationCap className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">For Students</h3>
              <p className="text-sm text-muted-foreground">Choose the right stream, course, and higher education options with confidence.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border card-hover" data-testid="card-professionals">
              <Briefcase className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">For Professionals</h3>
              <p className="text-sm text-muted-foreground">Navigate career transitions, upskill for the AI era, and unlock growth opportunities.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border card-hover" data-testid="card-schools">
              <School className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">For Schools & Colleges</h3>
              <p className="text-sm text-muted-foreground">Enable your students with structured, research-backed career guidance.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border card-hover" data-testid="card-corporates">
              <Building className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">For Corporates</h3>
              <p className="text-sm text-muted-foreground">Build engaged, future-ready teams through customized workshops and seminars.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-book-discovery-call"
            >
              Book Your Free Discovery Call
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#services")}
              className="border border-border bg-background px-8 py-4 rounded-lg text-lg font-semibold hover:bg-muted transition-colors"
              data-testid="button-explore-services"
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
