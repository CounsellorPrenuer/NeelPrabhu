import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import CompassIcon from "@/components/ui/compass-icon";

const navigationItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Neel Prabhu" },
  { href: "#services", label: "Services" },
  { href: "#workshops", label: "Workshops" },
  { href: "#blog", label: "Resources" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 compass-gradient rounded-lg flex items-center justify-center">
              <CompassIcon className="w-6 h-6 text-primary-foreground animate-compass-spin" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerMentoria</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-book-call"
            >
              Book a Free Career Call
            </Button>
            <Button
              onClick={() => scrollToSection('#services')}
              variant="outline"
              data-testid="button-explore-services"
            >
              Explore Services
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="mobile-button-book-call"
                >
                  Book a Free Career Call
                </Button>
                <Button
                  onClick={() => scrollToSection('#services')}
                  variant="outline"
                  data-testid="mobile-button-explore-services"
                >
                  Explore Services
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
