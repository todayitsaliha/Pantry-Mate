import { Link } from "react-router-dom";
import { ChefHat, Heart, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/pantry", label: "Start Cooking" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="bg-[hsl(var(--header-footer))]">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group w-fit">
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
                  <span className="text-[10px] text-primary-foreground/50 uppercase tracking-widest font-medium">
                    AI Recipe Generator
                  </span>
                </div>
              </Link>
              <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
                Transform your random ingredients into delicious meals with AI-powered recipe suggestions.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-primary-foreground/60 hover:text-primary transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2.5 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground/60 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/50">
                Have questions? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
                © {currentYear} PantryMate. Made with 
                <Heart className="h-3.5 w-3.5 text-accent fill-accent" /> 
                for home cooks.
              </p>
              <div className="flex items-center gap-6 text-xs text-primary-foreground/40">
                <span className="hover:text-primary-foreground/60 transition-colors cursor-pointer">Privacy</span>
                <span className="hover:text-primary-foreground/60 transition-colors cursor-pointer">Terms</span>
                <span className="hover:text-primary-foreground/60 transition-colors cursor-pointer">Cookies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;