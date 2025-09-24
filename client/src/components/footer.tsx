import CompassIcon from "@/components/ui/compass-icon";
import { Linkedin, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Neel Prabhu" },
  { href: "#services", label: "Services" },
  { href: "#workshops", label: "Workshops" },
  { href: "#blog", label: "Resources" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const services = [
  { label: "Student Career Guidance" },
  { label: "Professional Coaching" },
  { label: "Corporate Workshops" },
  { label: "Psychometric Assessment" },
  { label: "Mentoria Platform" },
  { label: "Ongoing Mentorship" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 compass-gradient rounded-lg flex items-center justify-center">
                  <CompassIcon className="w-6 h-6 text-primary-foreground animate-compass-spin" />
                </div>
                <span className="text-2xl font-bold text-white">CareerMentoria</span>
              </div>
              
              <p className="text-accent-foreground/80 max-w-md leading-relaxed">
                Guiding careers with clarity, confidence & purpose. Your trusted partner in career discovery and professional growth, partnered with Mentoria for lifelong mentorship and structured career guidance.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/neel-prabhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  data-testid="footer-link-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  data-testid="footer-link-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  data-testid="footer-link-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-accent-foreground/80 hover:text-white transition-colors text-left"
                      data-testid={`footer-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <button
                      onClick={() => scrollToSection('#services')}
                      className="text-accent-foreground/80 hover:text-white transition-colors text-left"
                      data-testid={`footer-service-${service.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {service.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
            <div className="grid md:grid-cols-3 gap-6 text-accent-foreground/80">
              <div>
                <p className="font-medium text-white">Phone</p>
                <p>+91 9921193333</p>
              </div>
              <div>
                <p className="font-medium text-white">Email</p>
                <p>neelprabhu3@gmail.com</p>
              </div>
              <div>
                <p className="font-medium text-white">Website</p>
                <p>careermentoria.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-accent-foreground/60 text-sm mb-4 md:mb-0">
              © 2025 CareerMentoria. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-accent-foreground/60 hover:text-white transition-colors"
                data-testid="footer-link-privacy"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-accent-foreground/60 hover:text-white transition-colors"
                data-testid="footer-link-terms"
              >
                Terms of Service
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-accent-foreground/60 hover:text-white transition-colors"
                data-testid="footer-link-cookies"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
