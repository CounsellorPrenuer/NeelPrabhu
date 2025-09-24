import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Zap, Handshake } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">About Neel Prabhu</h2>
            <p className="text-xl text-muted-foreground">Educator | Entrepreneur | Certified Career Counsellor | Mentor</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              {/* Professional headshot placeholder */}
              <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center" data-testid="img-neel-prabhu">
                <svg className="w-24 h-24 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-muted-foreground" data-testid="text-about-intro">
                With over 20 years of experience in education technology and career development, Neel Prabhu has impacted the academic and professional journeys of thousands of students and working professionals across India and abroad.
              </p>

              <p className="text-lg text-muted-foreground" data-testid="text-about-approach">
                Neel blends psychometric assessments, personalized coaching, and practical industry insights to guide individuals toward fulfilling careers. Having collaborated with schools, colleges, universities, and corporate clients, he brings a unique global perspective to career counselling—balancing academic planning, employability, and personal growth.
              </p>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                    <span className="text-2xl mr-3">🔑</span>
                    What Defines Neel's Approach
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Empathetic & Personal</h4>
                        <p className="text-sm text-muted-foreground">Every individual's journey is unique, and guidance is tailored accordingly.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Action-Oriented</h4>
                        <p className="text-sm text-muted-foreground">Beyond assessments, clients leave with clear, step-by-step action plans.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Future-Ready</h4>
                        <p className="text-sm text-muted-foreground">Advice rooted in AI, digital transformation, and global industry trends.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Handshake className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Trusted Partnerships</h4>
                        <p className="text-sm text-muted-foreground">Collaborates with Mentoria, India's leading career discovery platform, to provide lifelong mentorship access.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <blockquote className="text-lg italic text-center p-6 bg-muted/50 rounded-lg border-l-4 border-primary" data-testid="quote-mission">
                "Careers are not built by chance—they are designed with clarity and purpose. My mission is to empower individuals and institutions with tools, knowledge, and strategies to create those careers."
                <footer className="text-sm text-muted-foreground mt-2">– Neel Prabhu</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
