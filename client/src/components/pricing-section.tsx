import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Shield } from "lucide-react";
import PaymentDialog from "@/components/payment-dialog";
import {
  fetchCustomPlans,
  fetchStandardPlans,
  type CustomPlan,
  type StandardPlan,
} from "@/lib/sanity";
import { formatInr } from "@/lib/currency";
import { MotionDiv, MotionSection, fadeInUp } from "@/components/ui/motion";

type Group = "8-10" | "10-12" | "college" | "working";

const groups: { key: Group; label: string; short: string }[] = [
  { key: "8-10", label: "8-10 Students", short: "8-10" },
  { key: "10-12", label: "10-12 Students", short: "10-12" },
  { key: "college", label: "College Students", short: "College" },
  { key: "working", label: "Working Professionals", short: "Working" },
];

const fallbackStandard: StandardPlan[] = [
  {
    _id: "pkg-1",
    planId: "NeelPrabhu-pkg-1",
    title: "Discover",
    subgroup: "8-10",
    price: 5500,
    features: [
      "Psychometric assessment",
      "1 career counselling session",
      "Lifetime Knowledge Gateway access",
      "Live webinar invites",
    ],
  },
  {
    _id: "pkg-2",
    planId: "NeelPrabhu-pkg-2",
    title: "Discover Plus+",
    subgroup: "8-10",
    price: 15000,
    features: [
      "Psychometric assessments",
      "8 career counselling sessions (1/year)",
      "Custom reports & study abroad guidance",
      "CV building",
    ],
    isPopular: true,
  },
  {
    _id: "pkg-3",
    planId: "NeelPrabhu-pkg-3",
    title: "Achieve Online",
    subgroup: "10-12",
    price: 5999,
    features: [
      "Psychometric assessment",
      "1 career counselling session",
      "Lifetime Knowledge Gateway access",
      "Pre-recorded webinars",
    ],
  },
  {
    _id: "pkg-4",
    planId: "NeelPrabhu-pkg-4",
    title: "Achieve Plus+",
    subgroup: "10-12",
    price: 10599,
    features: [
      "Psychometric assessment",
      "4 career counselling sessions",
      "Custom reports & study abroad guidance",
      "CV reviews",
    ],
  },
  {
    _id: "pkg-5",
    planId: "NeelPrabhu-pkg-5",
    title: "Ascend Online",
    subgroup: "college",
    price: 6499,
    features: [
      "Psychometric assessment",
      "1 career counselling session",
      "Lifetime Knowledge Gateway access",
      "Pre-recorded webinars",
    ],
  },
  {
    _id: "pkg-6",
    planId: "NeelPrabhu-pkg-6",
    title: "Ascend Plus+",
    subgroup: "college",
    price: 10599,
    features: [
      "Psychometric assessment",
      "3 career counselling sessions",
      "Certificate/online course info",
      "CV reviews for jobs",
    ],
    isPopular: true,
  },
  {
    _id: "mp-3",
    planId: "NeelPrabhu-mp-3",
    title: "Ascend Online",
    subgroup: "working",
    price: 6499,
    features: [
      "Psychometric assessment",
      "1 career counselling session",
      "Lifetime Knowledge Gateway access",
      "Pre-recorded webinars",
    ],
  },
  {
    _id: "mp-2",
    planId: "NeelPrabhu-mp-2",
    title: "Ascend Plus+",
    subgroup: "working",
    price: 10599,
    features: [
      "Psychometric assessment",
      "3 career counselling sessions",
      "Certificate/online course info",
      "CV reviews for jobs",
    ],
    isPopular: true,
  },
];

const fallbackCustom: CustomPlan[] = [
  {
    _id: "career-report",
    planId: "NeelPrabhu-custom-career-report",
    title: "Career Report",
    price: 1500,
    description:
      "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.",
  },
  {
    _id: "career-report-counselling",
    planId: "NeelPrabhu-custom-career-report-counselling",
    title: "Career Report + Career Counselling",
    price: 3000,
    description:
      "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.",
  },
  {
    _id: "knowledge-gateway",
    planId: "NeelPrabhu-custom-knowledge-gateway",
    title: "Knowledge Gateway + Career Helpline Access",
    price: 100,
    description:
      "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline.",
  },
  {
    _id: "one-to-one-session",
    planId: "NeelPrabhu-custom-one-to-one-session",
    title: "One-to-One Session with a Career Expert",
    price: 3500,
    description:
      "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.",
  },
  {
    _id: "college-admission-planning",
    planId: "NeelPrabhu-custom-college-admission-planning",
    title: "College Admission Planning",
    price: 3000,
    description:
      "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.",
  },
  {
    _id: "exam-stress-management",
    planId: "NeelPrabhu-custom-exam-stress-management",
    title: "Exam Stress Management",
    price: 1000,
    description:
      "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators.",
  },
  {
    _id: "cap-100",
    planId: "NeelPrabhu-custom-cap-100",
    title: "College Admissions Planner - 100 (CAP-100)",
    price: 199,
    description:
      "Rs. 199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs.",
  },
];

export default function PricingSection() {
  const [activeGroup, setActiveGroup] = useState<Group>("8-10");
  const [selected, setSelected] = useState<{
    planId: string;
    title: string;
    amount: number;
  } | null>(null);

  const { data: standardData = fallbackStandard } = useQuery({
    queryKey: ["sanity-standard-plans"],
    queryFn: fetchStandardPlans,
  });
  const { data: customData = fallbackCustom } = useQuery({
    queryKey: ["sanity-custom-plans"],
    queryFn: fetchCustomPlans,
  });

  const groupPlans = useMemo(
    () => standardData.filter((p) => p.subgroup === activeGroup),
    [standardData, activeGroup],
  );

  return (
    <MotionSection
      id="pricing"
      className="py-20 bg-gradient-to-br from-background via-background-alt to-background"
      data-testid="pricing-section"
    >
      <div className="container-responsive">
        <MotionDiv
          className="max-w-3xl mx-auto text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Badge className="mb-4 px-4 py-1">Mentoria Packages</Badge>
          <h2 className="text-fluid-3xl lg:text-fluid-4xl font-bold text-foreground mb-4">
            Choose Your Career Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            Flexible Mentoria plans for every stage — from school to working
            professionals.
          </p>
        </MotionDiv>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 px-2">
          {groups.map((group) => (
            <Button
              key={group.key}
              variant={activeGroup === group.key ? "default" : "outline"}
              size="sm"
              className="rounded-full px-4 sm:px-6 text-sm sm:text-base min-h-10"
              onClick={() => setActiveGroup(group.key)}
            >
              <span className="hidden sm:inline">{group.label}</span>
              <span className="sm:hidden">{group.short}</span>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {groupPlans.map((plan) => (
            <Card
              key={plan.planId}
              className={`relative overflow-hidden transition-shadow hover:shadow-lg ${
                plan.isPopular ? "border-2 border-primary shadow-md" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                <p className="text-3xl sm:text-4xl font-bold text-primary mt-3">
                  {formatInr(plan.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  One-time investment
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() =>
                    setSelected({
                      planId: plan.planId,
                      title: plan.title,
                      amount: plan.price,
                    })
                  }
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mt-20 mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Want To Customise Your Mentorship Plan?
          </h3>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            If you want to subscribe to specific services from Mentoria that
            resolve your career challenges, you can choose one or more of the
            following:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {customData.map((plan) => (
            <Card key={plan.planId} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-foreground">{plan.title}</h4>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formatInr(plan.price)}
                </p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {plan.description}
                </p>
                <Button
                  className="mt-5 w-full sm:w-auto"
                  onClick={() =>
                    setSelected({
                      planId: plan.planId,
                      title: plan.title,
                      amount: plan.price,
                    })
                  }
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-muted rounded-xl px-6 py-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Secure payments via Razorpay. Confirmation email after successful
              payment.
            </span>
          </div>
        </div>
      </div>

      {selected && (
        <PaymentDialog
          open={Boolean(selected)}
          onOpenChange={(open) => !open && setSelected(null)}
          packageId={selected.planId}
          packageName={selected.title}
          packagePrice={formatInr(selected.amount)}
        />
      )}
    </MotionSection>
  );
}
