import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Users, Compass, Check } from "lucide-react";

export default function ServicesSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Services</h2>
          <p className="text-xl text-muted-foreground">Comprehensive career guidance solutions tailored for every stage of your journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Services */}
          <div className="bg-card p-8 rounded-lg border card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Career Guidance for Students</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Psychometric assessments (personality, aptitude, interests, values)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Stream & subject selection (Class 8–12)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Career counselling for graduation & post-graduation choices</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Admission guidance (India & Abroad)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Personalized career roadmaps for clarity and confidence</span>
              </li>
            </ul>
            <Button 
              onClick={() => scrollToSection("#pricing")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-explore-student-services"
            >
              Explore Student Services
            </Button>
          </div>

          {/* Professional Services */}
          <div className="bg-card p-8 rounded-lg border card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Career Guidance for Professionals</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>Career pivot & transition planning</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>Upskilling guidance for AI & digital transformation</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>Resume & LinkedIn optimization for global opportunities</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>Executive presence & leadership coaching</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span>One-on-one mentoring for mid-career clarity</span>
              </li>
            </ul>
            <Button 
              onClick={() => scrollToSection("#pricing")}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              data-testid="button-explore-professional-services"
            >
              Explore Professional Services
            </Button>
          </div>

          {/* Workshops & Seminars */}
          <div className="bg-card p-8 rounded-lg border card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Workshops & Seminars</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Career Awareness Programs for Students</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Skill Development Workshops (Communication, Decision-Making, Leadership)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Industry & Future-Ready Skills Seminars</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Corporate Wellbeing & Engagement Programs</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Faculty/Parent Awareness Programs for better career support</span>
              </li>
            </ul>
            <Button 
              onClick={() => scrollToSection("#workshops")}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              data-testid="button-explore-workshops"
            >
              Explore Workshops
            </Button>
          </div>

          {/* Ongoing Mentorship */}
          <div className="bg-card p-8 rounded-lg border card-hover">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Ongoing Mentorship</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access to Mentoria's Knowledge Gateway</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Expert webinars and learning modules</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Continuous support for career decisions at every stage</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Access to India's largest career discovery platform</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Community of like-minded career-focused individuals</span>
              </li>
            </ul>
            <Button 
              onClick={() => scrollToSection("#mentoria")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-join-mentorship"
            >
              Learn About Mentorship
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
