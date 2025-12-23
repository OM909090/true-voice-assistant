import { Phone, ShieldCheck, Mic, Bell, TrendingUp, PhoneIncoming, PhoneMissed, PhoneOutgoing } from "lucide-react";
import { CallEntry } from "../calls/CallCard";

interface HomeScreenProps {
  recentCalls: CallEntry[];
  onCallClick: (call: CallEntry) => void;
}

export function HomeScreen({ recentCalls, onCallClick }: HomeScreenProps) {
  const stats = {
    blocked: 127,
    identified: 2847,
    saved: 45,
  };

  return (
    <div className="px-4 pb-24 safe-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">TRUE AI</h1>
          <p className="text-sm text-muted-foreground">Your AI-powered caller ID</p>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">3</span>
        </button>
      </div>

      {/* AI Assistant Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-info/20 p-6 mb-6 border border-primary/30 animate-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/30 to-transparent blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center glow-sm">
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Voice AI Ready</h3>
              <p className="text-xs text-muted-foreground">Tap the mic to start</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            "Hey TRUE AI, call Mom and say I'll be late"
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 border border-border animate-in delay-75">
          <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center mb-2">
            <ShieldCheck className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.blocked}</p>
          <p className="text-xs text-muted-foreground">Spam Blocked</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border animate-in delay-150">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.identified}</p>
          <p className="text-xs text-muted-foreground">Calls Identified</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border animate-in delay-225">
          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.saved}</p>
          <p className="text-xs text-muted-foreground">Auto-Saved</p>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="animate-in delay-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent Activity</h2>
          <button className="text-sm text-primary">See all</button>
        </div>
        <div className="space-y-3">
          {recentCalls.slice(0, 4).map((call, index) => (
            <button
              key={call.id}
              onClick={() => onCallClick(call)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all active:scale-[0.98]"
              style={{ animationDelay: `${(index + 4) * 75}ms` }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                call.isSpam ? 'bg-spam/20 text-spam' : 'bg-primary/10 text-primary'
              }`}>
                {call.type === "missed" ? (
                  <PhoneMissed className="w-5 h-5 text-destructive" />
                ) : call.type === "outgoing" ? (
                  <PhoneOutgoing className="w-5 h-5 text-info" />
                ) : (
                  <PhoneIncoming className="w-5 h-5 text-success" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${call.isSpam ? 'text-spam' : 'text-foreground'}`}>
                  {call.isSpam ? "Spam Detected" : call.name}
                </p>
                <p className="text-xs text-muted-foreground">{call.number}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{call.time}</p>
                {call.duration && <p className="text-xs text-muted-foreground">{call.duration}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
