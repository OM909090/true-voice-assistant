import { cn } from "@/lib/utils";

type BadgeVariant = "active" | "beta" | "ready" | "progress" | "planned" | "tool" | "get" | "post";

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-success/20 text-success border-success/30",
  beta: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  ready: "bg-success/20 text-success border-success/30",
  progress: "bg-info/20 text-info border-info/30",
  planned: "bg-muted text-muted-foreground border-muted-foreground/30",
  tool: "bg-info/20 text-info border-info/30",
  get: "bg-success/20 text-success border-success/30",
  post: "bg-warning/20 text-warning border-warning/30",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
