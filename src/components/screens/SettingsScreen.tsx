import { useState } from "react";
import { 
  User, ChevronRight, Shield, Bell, Mic, Globe, 
  Brain, Key, Moon, HelpCircle, LogOut, Sparkles,
  Volume2, Smartphone
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AIProvider {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const aiProviders: AIProvider[] = [
  { id: "openai", name: "OpenAI GPT-4", description: "Best reasoning & function calling", isActive: true },
  { id: "gemini", name: "Google Gemini", description: "Fast responses, cost effective", isActive: false },
  { id: "custom", name: "Custom Model", description: "Self-hosted, full privacy", isActive: false },
];

export function SettingsScreen() {
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [busyMode, setBusyMode] = useState(true);
  const [spamBlock, setSpamBlock] = useState(true);
  const [voiceNotifications, setVoiceNotifications] = useState(true);

  return (
    <div className="px-4 pb-24 safe-top">
      {/* Header */}
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your TRUE AI experience</p>
      </div>

      {/* Profile */}
      <div className="bg-card rounded-2xl p-4 border border-border mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">User Profile</h3>
          <p className="text-sm text-muted-foreground">+91 98765 43210</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* AI Brain Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">AI Brain</h2>
        </div>
        <div className="space-y-2">
          {aiProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                selectedProvider === provider.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                selectedProvider === provider.id ? "bg-primary" : "bg-secondary"
              }`}>
                <Sparkles className={`w-5 h-5 ${
                  selectedProvider === provider.id ? "text-primary-foreground" : "text-muted-foreground"
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{provider.name}</p>
                <p className="text-xs text-muted-foreground">{provider.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedProvider === provider.id ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {selectedProvider === provider.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* API Key input */}
        <div className="mt-3 p-4 bg-card rounded-2xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">API Key</span>
          </div>
          <input
            type="password"
            placeholder="Enter your API key"
            className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground mt-2">🔒 Encrypted locally, never sent to our servers</p>
        </div>
      </div>

      {/* Voice Settings */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Volume2 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Voice Settings</h2>
        </div>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <SettingRow
            icon={<Mic className="w-5 h-5" />}
            title="Voice Notifications"
            description="Read caller info aloud"
            action={
              <Switch checked={voiceNotifications} onCheckedChange={setVoiceNotifications} />
            }
          />
          <SettingRow
            icon={<Globe className="w-5 h-5" />}
            title="Language"
            description="Odia, Hindi, English"
            action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
          />
        </div>
      </div>

      {/* Call Settings */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Call Settings</h2>
        </div>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <SettingRow
            icon={<Bell className="w-5 h-5" />}
            title="Busy Mode"
            description="AI answers when you're busy"
            action={<Switch checked={busyMode} onCheckedChange={setBusyMode} />}
          />
          <SettingRow
            icon={<Shield className="w-5 h-5" />}
            title="Auto Block Spam"
            description="Block high-confidence spam"
            action={<Switch checked={spamBlock} onCheckedChange={setSpamBlock} />}
          />
        </div>
      </div>

      {/* Other */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
        <SettingRow
          icon={<Moon className="w-5 h-5" />}
          title="Dark Mode"
          description="Always on"
          action={<Switch checked disabled />}
        />
        <SettingRow
          icon={<HelpCircle className="w-5 h-5" />}
          title="Help & Support"
          action={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
        />
        <SettingRow
          icon={<LogOut className="w-5 h-5 text-destructive" />}
          title="Sign Out"
          titleColor="text-destructive"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        TRUE AI v1.0.0 • Made with ❤️ in India
      </p>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  description,
  action,
  titleColor = "text-foreground",
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  titleColor?: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border last:border-0">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1">
        <p className={`font-medium ${titleColor}`}>{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
