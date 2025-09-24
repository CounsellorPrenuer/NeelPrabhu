import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function MentoriaSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="mentoria" className="py-20 bg-secondary text-secondary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Powered by Mentoria's Career Discovery Platform
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Every CareerMentoria plan includes lifetime access to Mentoria: India's most trusted platform for career discovery, mentorship, and lifelong upskilling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Platform Interface Showcase */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2 stats-counter" data-count="350000" data-testid="stat-students-mentored">
                      3,50,000+
                    </div>
                    <p className="text-secondary-foreground/80 text-sm">Students and Professionals Mentored</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2 stats-counter" data-count="240" data-testid="stat-corporate-partners">
                      240+
                    </div>
                    <p className="text-secondary-foreground/80 text-sm">Corporate Partners</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2 stats-counter" data-count="350" data-testid="stat-school-partners">
                      350+
                    </div>
                    <p className="text-secondary-foreground/80 text-sm">Schools and College Partners</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2 stats-counter" data-count="1000" data-testid="stat-webinar-hours">
                      1000+
                    </div>
                    <p className="text-secondary-foreground/80 text-sm">Hours of Career Webinars</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold mb-4">
                    Mentoria - Clutter to Clarity
                  </div>
                  <p className="text-secondary-foreground/80">Career Discovery Platform</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 class="text-2xl font-bold text-white mb-6">Career Discovery Platform</h3>
              <p class="text-secondary-foreground/80 mb-6">
                Access a comprehensive ecosystem of career resources, expert guidance, and continuous learning opportunities designed to support your career journey at every stage.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Psychometric assessments and career mapping tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Live webinars with industry experts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Personalized learning modules and skill development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Ongoing mentorship and career support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Access to career helpline and expert guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-secondary-foreground/90">Community of career-focused individuals</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection("#pricing")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold"
              data-testid="button-explore-mentoria"
            >
              Explore Mentoria's Comprehensive Career Platform
            </Button>
          </div>
        </div>

        {/* Platform Features Highlight */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Career Discovery</h4>
              <p class="text-secondary-foreground/80 text-sm">Scientifically designed assessments to identify your strengths and interests</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Learning Resources</h4>
              <p class="text-secondary-foreground/80 text-sm">Curated content, courses, and materials for continuous skill development</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Expert Network</h4>
              <p class="text-secondary-foreground/80 text-sm">Access to industry professionals and career mentors for personalized guidance</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
