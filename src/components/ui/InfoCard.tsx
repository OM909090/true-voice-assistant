import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CardVariant = "info" | "warning" | "success" | "error";

interface InfoCardProps {
  variant?: CardVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig: Record<CardVariant, { icon: React.ComponentType<{ className?: string }>; styles: string }> = {
  info: {
    icon: Info,
    styles: "bg-info/10 border-info/30 text-info",
  },
  warning: {
    icon: AlertTriangle,
    styles: "bg-warning/10 border-warning/30 text-warning",
  },
  success: {
    icon: CheckCircle,
    styles: "bg-success/10 border-success/30 text-success",
  },
  error: {
    icon: XCircle,
    styles: "bg-destructive/10 border-destructive/30 text-destructive",
  },
};

export function InfoCard({ variant = "info", title, children, className }: InfoCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-4 p-5 rounded-xl border backdrop-blur-sm",
        config.styles,
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-semibold text-info mb-1">{title}</h4>
        <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
