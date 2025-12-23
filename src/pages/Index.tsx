import { useState } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { CallsScreen } from "@/components/screens/CallsScreen";
import { ContactsScreen } from "@/components/screens/ContactsScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { VoiceAssistant } from "@/components/voice/VoiceAssistant";
import { CallEntry } from "@/components/calls/CallCard";

const sampleCalls: CallEntry[] = [
  { id: "1", name: "Mom", number: "+91 98765 43210", time: "Just now", type: "incoming", duration: "5 min", isVerified: true },
  { id: "2", name: "Unknown", number: "+91 87654 32109", time: "2 min ago", type: "missed", isSpam: true, spamScore: 0.89 },
  { id: "3", name: "Ankit", number: "+91 76543 21098", time: "1 hour ago", type: "outgoing", duration: "2 min", isVerified: true },
  { id: "4", name: "Office", number: "+91 11 2345 6789", time: "3 hours ago", type: "incoming", duration: "15 min" },
  { id: "5", name: "Swiggy", number: "+91 80 4567 8901", time: "Yesterday", type: "incoming", duration: "1 min" },
  { id: "6", name: "Unknown", number: "+91 99887 76655", time: "Yesterday", type: "missed" },
  { id: "7", name: "Dad", number: "+91 98765 43211", time: "2 days ago", type: "outgoing", duration: "8 min", isVerified: true },
  { id: "8", name: "Spam Caller", number: "+91 12345 67890", time: "2 days ago", type: "missed", isSpam: true, spamScore: 0.95 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "voice") {
      setShowVoiceAssistant(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleCallClick = (call: CallEntry) => {
    console.log("Call clicked:", call);
  };

  return (
    <div className="mobile-container min-h-screen bg-background">
      {activeTab === "home" && (
        <HomeScreen recentCalls={sampleCalls} onCallClick={handleCallClick} />
      )}
      {activeTab === "calls" && (
        <CallsScreen calls={sampleCalls} onCallClick={handleCallClick} />
      )}
      {activeTab === "contacts" && <ContactsScreen />}
      {activeTab === "settings" && <SettingsScreen />}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {showVoiceAssistant && (
        <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />
      )}
    </div>
  );
};

export default Index;
