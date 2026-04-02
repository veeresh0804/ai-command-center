import { Terminal, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 px-4 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 font-display text-sm font-bold tracking-wider">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="gradient-text">PORTFOLIO</span>
        </div>
        <p className="flex items-center gap-1 font-body text-sm text-muted-foreground">
          Built with <Heart className="h-3 w-3 text-primary" /> using React & Three.js
        </p>
        <p className="font-mono text-xs text-muted-foreground">© 2026 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
