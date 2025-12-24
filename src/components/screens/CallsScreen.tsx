import { useState, useEffect } from "react";
import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Search, Mic, Loader2 } from "lucide-react";
import { CallCard, CallEntry } from "../calls/CallCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CallsScreenProps {
  calls: CallEntry[];
  onCallClick: (call: CallEntry) => void;
}

type FilterType = "all" | "missed" | "incoming" | "outgoing" | "spam";

export function CallsScreen({ calls: propCalls, onCallClick }: CallsScreenProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [calls, setCalls] = useState<CallEntry[]>(propCalls);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const fetchCallLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      
      // Transform database records to CallEntry format
      const transformedCalls: CallEntry[] = (data || []).map((log) => ({
        id: log.id,
        name: log.caller_name || 'Unknown',
        number: log.phone_number,
        time: new Date(log.created_at).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        type: log.call_type as 'incoming' | 'outgoing' | 'missed',
        duration: log.duration_seconds > 0 ? `${Math.floor(log.duration_seconds / 60)}m ${log.duration_seconds % 60}s` : undefined,
        isSpam: log.is_spam,
        isVerified: false,
        aiHandled: log.ai_handled
      }));
      
      // Merge with prop calls if no DB data
      setCalls(transformedCalls.length > 0 ? transformedCalls : propCalls);
    } catch (error) {
      console.error('Error fetching call logs:', error);
      setCalls(propCalls);
    } finally {
      setLoading(false);
    }
  };

  const filters: { id: FilterType; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: "All" },
    { id: "missed", label: "Missed", icon: PhoneMissed },
    { id: "incoming", label: "Incoming", icon: PhoneIncoming },
    { id: "outgoing", label: "Outgoing", icon: PhoneOutgoing },
    { id: "spam", label: "Spam" },
  ];

  const filteredCalls = calls.filter((call) => {
    if (filter === "spam") return call.isSpam;
    if (filter === "all") return true;
    if (filter === "missed") return call.type === "missed";
    if (filter === "incoming") return call.type === "incoming";
    if (filter === "outgoing") return call.type === "outgoing";
    return true;
  }).filter((call) => {
    if (!searchQuery) return true;
    return call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           call.number.includes(searchQuery);
  });

  return (
    <div className="px-4 pb-24 safe-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pt-4">
        <h1 className="text-2xl font-bold text-foreground">Call History</h1>
        <button className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <Mic className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search calls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.icon && <f.icon className="w-4 h-4" />}
            {f.label}
            {f.id === "missed" && (
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                filter === f.id ? "bg-primary-foreground/20" : "bg-destructive/20 text-destructive"
              }`}>
                {calls.filter(c => c.type === "missed").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Voice prompt */}
      <div className="bg-card/50 rounded-2xl p-4 mb-4 border border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Mic className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Say <span className="text-primary font-medium">"Read my call log"</span> to hear your history
        </p>
      </div>

      {/* Calls List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCalls.map((call, index) => (
            <div key={call.id} className="animate-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CallCard call={call} onClick={() => onCallClick(call)} />
            </div>
          ))}
          
          {filteredCalls.length === 0 && (
            <div className="text-center py-12">
              <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No calls found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
