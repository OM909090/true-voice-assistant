import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function SectionCard({ icon, title, children, className, headerAction }: SectionCardProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden animate-in", className)}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {headerAction}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
