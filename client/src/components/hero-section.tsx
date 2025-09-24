import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, School, Building, Compass, Star, Users, Award } from "lucide-react";
import { MotionDiv, MotionStagger, MotionCard, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from "@/components/ui/motion";

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

  const stats = [
    { value: "20+", label: "Years Experience", icon: Award },
    { value: "5000+", label: "Students Guided", icon: Users },
    { value: "4.9", label: "Average Rating", icon: Star },
  ];

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 hero-mesh">
        <div className="absolute top-20 left-10 w-72 h-72 gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Parallax Compass Icon */}
      <MotionDiv 
        className="absolute top-20 right-20 opacity-10 dark:opacity-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <Compass className="w-32 h-32 text-primary" focusable="false" />
      </MotionDiv>

      <div className="container-responsive relative z-10">
        <MotionDiv 
          className="max-w-5xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Badge */}
          <MotionDiv variants={scaleIn} className="mb-8">
            <Badge className="px-6 py-2 bg-primary/10 text-primary border-primary/20 text-sm font-medium">
              🎯 20+ Years of Career Excellence
            </Badge>
          </MotionDiv>

          {/* Main Headline */}
          <MotionDiv variants={fadeInUp}>
            <h1 className="text-fluid-4xl lg:text-fluid-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              Future-Proof Your Career.{" "}
              <br className="hidden sm:block" />
              Shape Your Tomorrow.
            </h1>
          </MotionDiv>
          
          {/* Subtitle */}
          <MotionDiv variants={fadeInUp}>
            <p className="text-fluid-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed text-pretty">
              At CareerMentoria, we believe every student and professional deserves clarity, direction, and confidence in their career journey. In an era where AI, automation, and global shifts are transforming the world of work, we help you discover your strengths, align them with opportunities, and build a future-ready career path.
            </p>
          </MotionDiv>

          {/* Stats Row */}
          <MotionDiv variants={fadeInUp} className="mb-12">
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {stats.map((stat, index) => (
                <MotionDiv 
                  key={index} 
                  className="flex items-center gap-3 glass-card px-6 py-4 rounded-2xl"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          {/* CTA Buttons */}
          <MotionDiv variants={fadeInUp} className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('#contact')}
                size="lg"
                className="btn-glow gradient-primary text-white hover:opacity-90 shadow-glow-lg px-8 py-4 text-lg font-semibold rounded-2xl interactive-scale"
                data-testid="button-book-discovery-call"
              >
                Book Your Free Discovery Call
              </Button>
              <Button
                onClick={() => scrollToSection('#services')}
                size="lg"
                variant="outline"
                className="glass-card border-primary/20 hover:bg-primary/5 px-8 py-4 text-lg font-semibold rounded-2xl interactive-scale"
                data-testid="button-explore-services-hero"
              >
                Explore Our Services
              </Button>
            </div>
          </MotionDiv>

          {/* Audience Cards */}
          <MotionStagger stagger={0.1} delay={0.3}>
            <div className="grid grid-auto-fit-sm gap-6">
              {audienceCards.map((card, index) => (
                <MotionDiv 
                  key={index} 
                  variants={fadeInUp}
                  data-testid={`card-audience-${index}`}
                >
                  <MotionCard 
                    className="glass-card p-6 rounded-2xl interactive-lift group h-full"
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-fluid-lg font-semibold mb-3 text-foreground">{card.title}</h3>
                    <p className="text-fluid-sm text-muted-foreground leading-relaxed text-pretty">{card.description}</p>
                  </MotionCard>
                </MotionDiv>
              ))}
            </div>
          </MotionStagger>
        </MotionDiv>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </MotionDiv>
    </section>
  );
}
