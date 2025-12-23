import { useState } from "react";
import {
  Cpu,
  Layers,
  Database,
  Mic,
  Wrench,
  Plug,
  Phone,
  PhoneCall,
  List,
  Code,
  Shield,
  Rocket,
  Search,
  ChevronDown,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "SYSTEM OVERVIEW",
    items: [
      { id: "architecture", label: "Architecture", icon: Cpu },
      { id: "components", label: "Core Components", icon: Layers },
      { id: "database", label: "Database Schema", icon: Database },
    ],
  },
  {
    title: "AI SYSTEM",
    items: [
      { id: "voice-agent", label: "Voice Agent", icon: Mic },
      { id: "tools", label: "Tool Definitions", icon: Wrench },
      { id: "models", label: "Pluggable Models", icon: Plug },
    ],
  },
  {
    title: "FEATURES",
    items: [
      { id: "caller-id", label: "Caller ID System", icon: Phone },
      { id: "call-automation", label: "Call Automation", icon: PhoneCall },
      { id: "call-logs", label: "Call Logs", icon: List },
    ],
  },
  {
    title: "IMPLEMENTATION",
    items: [
      { id: "api", label: "API Contracts", icon: Code },
      { id: "security", label: "Security & Privacy", icon: Shield },
      { id: "roadmap", label: "Roadmap", icon: Rocket },
    ],
  },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navigation.map((s) => s.title)
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <Phone className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">TRUE AI</h1>
            <p className="text-xs text-muted-foreground">Mobile Architecture</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sections..."
            className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navigation.map((section) => (
          <div key={section.title} className="mb-4">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.title}
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform",
                  expandedSections.includes(section.title) ? "" : "-rotate-90"
                )}
              />
            </button>
            {expandedSections.includes(section.title) && (
              <div className="space-y-1 animate-in">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={cn(
                      "nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                      activeSection === item.id
                        ? "bg-primary/10 text-primary active"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">Version</span>
          <span className="text-xs font-mono text-foreground">v1.0.0</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">System Architect</p>
            <p className="text-xs text-muted-foreground truncate">Senior Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
