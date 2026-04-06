import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/pantry", label: "Start Cooking" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient accent bar at top */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="bg-[hsl(var(--header-footer))] backdrop-blur-md border-b border-primary/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                  <ChefHat className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-primary-foreground tracking-tight">
                  PantryMate
                </span>
                <span className="text-[10px] text-primary-foreground/50 uppercase tracking-widest font-medium hidden sm:block">
                  AI Recipe Generator
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    location.pathname === link.path
                      ? "bg-primary/20 text-primary"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-px h-6 bg-primary-foreground/20 mx-2" />
              <Button size="sm" className="gap-2 shadow-md" asChild>
                <Link to="/pantry">
                  <Sparkles className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2.5 hover:bg-primary-foreground/10 rounded-xl transition-colors border border-primary-foreground/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-primary-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-foreground/10 animate-fade-in">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      location.pathname === link.path
                        ? "bg-primary/20 text-primary"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="mt-3 gap-2" asChild>
                  <Link to="/pantry" onClick={() => setIsMobileMenuOpen(false)}>
                    <Sparkles className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;