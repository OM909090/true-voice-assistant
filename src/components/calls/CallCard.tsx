import { Phone, ShieldCheck, ShieldAlert, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CallEntry {
  id: string;
  name: string;
  number: string;
  time: string;
  type: "incoming" | "outgoing" | "missed";
  duration?: string;
  isSpam?: boolean;
  spamScore?: number;
  isVerified?: boolean;
}

interface CallCardProps {
  call: CallEntry;
  onClick?: () => void;
}

export function CallCard({ call, onClick }: CallCardProps) {
  const getTypeColor = () => {
    if (call.isSpam) return "text-spam";
    switch (call.type) {
      case "missed":
        return "text-destructive";
      case "outgoing":
        return "text-info";
      default:
        return "text-success";
    }
  };

  const getTypeIcon = () => {
    if (call.type === "missed") return "↙";
    if (call.type === "outgoing") return "↗";
    return "↙";
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 active:scale-[0.98]"
    >
      {/* Avatar */}
      <div className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold",
        call.isSpam ? "bg-spam/20 text-spam" : "bg-primary/10 text-primary"
      )}>
        {call.name.charAt(0).toUpperCase()}
        {call.isVerified && (
          <ShieldCheck className="absolute -bottom-1 -right-1 w-4 h-4 text-success" />
        )}
        {call.isSpam && (
          <ShieldAlert className="absolute -bottom-1 -right-1 w-4 h-4 text-spam" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className={cn("font-medium", call.isSpam && "text-spam")}>
            {call.isSpam ? "Suspected Spam" : call.name}
          </span>
          {call.isSpam && call.spamScore && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-spam/20 text-spam">
              {Math.round(call.spamScore * 100)}% spam
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{call.number}</p>
      </div>

      {/* Time & Type */}
      <div className="text-right">
        <div className="flex items-center gap-1 text-sm">
          <span className={getTypeColor()}>{getTypeIcon()}</span>
          <span className="text-muted-foreground">{call.time}</span>
        </div>
        {call.duration && (
          <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
            <Clock className="w-3 h-3" />
            {call.duration}
          </p>
        )}
      </div>
    </button>
  );
}
