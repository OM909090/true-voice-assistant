import { Home, Phone, Users, Mic, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "calls", label: "Calls", icon: Phone },
  { id: "voice", label: "", icon: Mic, isCenter: true },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="glass border-t border-border safe-bottom">
          <div className="flex items-center justify-around px-2 pt-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center transition-all duration-300",
                  tab.isCenter
                    ? "relative -mt-8"
                    : "py-2 px-4 rounded-xl",
                  !tab.isCenter && activeTab === tab.id
                    ? "text-primary"
                    : !tab.isCenter && "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.isCenter ? (
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-50 blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center glow-primary shadow-lg">
                      <Mic className="w-7 h-7 text-primary-foreground" />
                    </div>
                    {activeTab === "voice" && (
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" />
                    )}
                  </div>
                ) : (
                  <>
                    <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "text-primary")} />
                    <span className="text-xs mt-1">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
