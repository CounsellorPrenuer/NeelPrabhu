import { Award, Map, Users, Globe, Brain, TrendingUp } from "lucide-react";

export default function WhySection() {
  return (
    <section id="why-careermentoria" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Why Choose CareerMentoria?</h2>
          <p className="text-xl text-muted-foreground">In a world of endless options, clarity is your biggest asset. CareerMentoria offers:</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">20+ Years of Expertise</h3>
                <p className="text-muted-foreground">Deep experience in guiding students, parents, professionals & corporates.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Map className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Holistic Career Mapping</h3>
                <p className="text-muted-foreground">Combining psychometric tools, skill-building, and career trends.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Workshops & Seminars</h3>
                <p className="text-muted-foreground">Practical sessions that inspire, educate, and prepare students and teams.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Global Perspective</h3>
                <p className="text-muted-foreground">Guidance shaped by collaborations across diverse cultures and industries.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Future-Ready Insights</h3>
                <p className="text-muted-foreground">Stay ahead in the AI-driven, fast-changing job market.</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Impact Snapshot</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center" data-testid="stat-years">
                <div className="text-3xl font-bold text-primary stats-counter mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Years in Education & Career Mentoring</div>
              </div>
              <div className="text-center" data-testid="stat-guided">
                <div className="text-3xl font-bold text-secondary stats-counter mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Students & Professionals Guided</div>
              </div>
              <div className="text-center" data-testid="stat-partners">
                <div className="text-3xl font-bold text-accent stats-counter mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Schools, Colleges & Corporate Partners</div>
              </div>
              <div className="text-center" data-testid="stat-satisfaction">
                <div className="text-3xl font-bold text-primary stats-counter mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction & Career Clarity Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
