import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Zap, Handshake } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { urlFor } from "@/lib/sanityImage";

const approachPoints = [
  {
    icon: Heart,
    title: "Empathetic & Personal",
    description: "Every individual's journey is unique, and guidance is tailored accordingly.",
  },
  {
    icon: Target,
    title: "Action-Oriented",
    description: "Beyond assessments, clients leave with clear, step-by-step action plans.",
  },
  {
    icon: Zap,
    title: "Future-Ready",
    description: "Advice rooted in AI, digital transformation, and global industry trends.",
  },
  {
    icon: Handshake,
    title: "Trusted Partnerships",
    description: "Collaborates with Mentoria, India's leading career discovery platform, to provide lifelong mentorship access.",
  },
];

export default function AboutSection() {
  const { data: settings } = useSiteSettings();
  const aboutSrc = urlFor(settings?.aboutImage, { width: 800, height: 1000 });

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-accent mb-4">About Neel Prabhu</h2>
            <p className="text-xl text-muted-foreground">Educator | Entrepreneur | Certified Career Counsellor | Mentor</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              {aboutSrc ? (
                <img
                  src={aboutSrc}
                  alt={settings?.aboutImage?.alt || "Neel Prabhu"}
                  className="w-full h-80 object-cover object-top rounded-lg mb-6 shadow-md"
                  data-testid="img-neel-prabhu"
                />
              ) : (
                <div
                  className="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mb-6 border border-primary/20"
                  data-testid="img-neel-prabhu"
                >
                  <div className="w-28 h-28 compass-gradient rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-5xl text-primary-foreground font-bold">NP</span>
                  </div>
                </div>
              )}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Professional Credentials</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>MBA - Karnataka State Open University</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>20+ Years in Education Technology</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Managing Director, TechBeats Software</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 20 years of experience in education technology and career development, Neel Prabhu has impacted the academic and professional journeys of thousands of students and working professionals across India and abroad.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Neel blends psychometric assessments, personalized coaching, and practical industry insights to guide individuals toward fulfilling careers. Having collaborated with schools, colleges, universities, and corporate clients, he brings a unique global perspective to career counselling—balancing academic planning, employability, and personal growth.
              </p>

              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-foreground text-xs">✓</span>
                    </div>
                    What Defines Neel's Approach
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {approachPoints.map((point, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <point.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{point.title}</h4>
                          <p className="text-sm text-muted-foreground">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-muted-foreground bg-muted/50 p-6 rounded-r-lg">
                "Careers are not built by chance—they are designed with clarity and purpose. My mission is to empower individuals and institutions with tools, knowledge, and strategies to create those careers."
                <footer className="mt-2 font-medium text-foreground not-italic">– Neel Prabhu</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
