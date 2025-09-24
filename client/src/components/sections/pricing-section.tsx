import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Check, Star } from "lucide-react";

const plans = {
  student: [
    {
      id: "starter",
      name: "Starter",
      price: 6499,
      description: "Perfect for school students",
      features: [
        "Comprehensive Psychometric Assessment",
        "1 Career Coaching Session with Neel",
        "Lifetime access to Mentoria Knowledge Gateway",
        "Access to Industry Expert Webinars"
      ],
      popular: false
    },
    {
      id: "advanced",
      name: "Advanced",
      price: 10599,
      description: "For students choosing higher education paths",
      features: [
        "Comprehensive Psychometric Assessment",
        "3 Career Coaching Sessions with Neel",
        "Masters' admission guidance (India & Abroad)",
        "CV Reviews & Internship Guidance",
        "Priority Career Helpline Access"
      ],
      popular: true
    }
  ],
  professional: [
    {
      id: "career-pivot",
      name: "Career Pivot",
      price: 12999,
      description: "For early/mid-level professionals",
      features: [
        "Career Resilience Audit (AI-proofing)",
        "Skill Mapping & Transferability Report",
        "Resume + LinkedIn Optimization",
        "2 Career Coaching Sessions with Neel"
      ],
      popular: false
    },
    {
      id: "executive",
      name: "Executive Transformation",
      price: 24999,
      description: "For senior professionals & leaders",
      features: [
        "Executive Leadership & Transition Coaching",
        "AI Skill Alignment Strategy",
        "Board-Level Thinking Frameworks",
        "Ongoing Mentoria Platform Access",
        "Personalized 1:1 Strategy Roadmap"
      ],
      popular: true
    }
  ]
};

export default function PricingSection() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<"student" | "professional">("student");

  const handleSelectPlan = (planId: string) => {
    setLocation(`/payment/${planId}`);
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Choose Your Career Journey</h2>
          <p className="text-xl text-muted-foreground">
            Flexible pricing plans designed to meet your specific career guidance needs, from students to senior professionals.
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={activeCategory === "student" ? "default" : "ghost"}
              onClick={() => setActiveCategory("student")}
              className="px-8 py-2"
              data-testid="button-student-plans"
            >
              🎓 Student Plans
            </Button>
            <Button
              variant={activeCategory === "professional" ? "default" : "ghost"}
              onClick={() => setActiveCategory("professional")}
              className="px-8 py-2"
              data-testid="button-professional-plans"
            >
              💼 Professional Plans
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans[activeCategory].map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-2 border-primary shadow-lg' : 'border'} card-hover`}
              data-testid={`card-plan-${plan.id}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time investment</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'} text-white`}
                  data-testid={`button-select-${plan.id}`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Future Trends Section */}
        <div className="mt-16 bg-accent/5 rounded-2xl p-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">The Changing World of Careers</h3>
          <p className="text-center text-lg text-muted-foreground mb-8">The digital transformation isn't coming—it's already here.</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary stats-counter mb-2">60%</div>
              <p className="text-muted-foreground">of professionals will need reskilling within the next 5 years</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-secondary stats-counter mb-2">AI</div>
              <p className="text-muted-foreground">literacy is no longer optional, it's essential</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-accent stats-counter mb-2">Global</div>
              <p className="text-muted-foreground">opportunities require adaptability, not just experience</p>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-foreground">At CareerMentoria, we help you:</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Assess career resilience against automation & AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Map your strengths, interests, and opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Build future-proof career strategies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Transition or grow without starting over</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Security Note */}
        <div className="mt-12 text-center">
          <div className="bg-muted rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-semibold text-foreground">Secure Payment Processing</span>
            </div>
            <p className="text-muted-foreground text-sm">All payments are processed securely through Razorpay. You'll receive a confirmation email and receipt after successful payment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
