import { Download, Rocket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Docs
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90 text-primary-foreground">
            <Rocket className="w-4 h-4" />
            Deploy System
          </Button>
        </div>
      </div>
    </header>
  );
}
