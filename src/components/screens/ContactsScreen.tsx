import { useState } from "react";
import { Search, Plus, Users, ShieldCheck, Star, Mic } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  number: string;
  isVerified?: boolean;
  isFavorite?: boolean;
  source: "manual" | "ai" | "community";
}

const sampleContacts: Contact[] = [
  { id: "1", name: "Mom", number: "+91 98765 43210", isVerified: true, isFavorite: true, source: "manual" },
  { id: "2", name: "Dad", number: "+91 98765 43211", isVerified: true, isFavorite: true, source: "manual" },
  { id: "3", name: "Ankit", number: "+91 87654 32109", isVerified: true, source: "manual" },
  { id: "4", name: "Office", number: "+91 11 2345 6789", source: "ai" },
  { id: "5", name: "Swiggy Delivery", number: "+91 80 4567 8901", source: "community" },
  { id: "6", name: "Amazon Delivery", number: "+91 80 1234 5678", source: "community" },
  { id: "7", name: "Bank HDFC", number: "+91 22 6789 0123", isVerified: true, source: "community" },
  { id: "8", name: "Dr. Sharma", number: "+91 99887 76655", source: "ai" },
];

export function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredContacts = sampleContacts.filter((contact) => {
    if (showFavorites && !contact.isFavorite) return false;
    if (!searchQuery) return true;
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           contact.number.includes(searchQuery);
  });

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);

  return (
    <div className="px-4 pb-24 safe-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pt-4">
        <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
        <button className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Voice prompt */}
      <div className="bg-card/50 rounded-2xl p-4 mb-4 border border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Mic className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Say <span className="text-primary font-medium">"Save this number as Raj"</span>
        </p>
      </div>

      {/* Favorites toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setShowFavorites(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !showFavorites
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <Users className="w-4 h-4" />
          All
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            showFavorites
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <Star className="w-4 h-4" />
          Favorites
        </button>
      </div>

      {/* Contacts List */}
      <div className="space-y-6">
        {Object.entries(groupedContacts).sort().map(([letter, contacts]) => (
          <div key={letter}>
            <p className="text-sm font-medium text-primary mb-2 px-1">{letter}</p>
            <div className="space-y-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all active:scale-[0.98]"
                >
                  <div className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {contact.name.charAt(0).toUpperCase()}
                    {contact.isVerified && (
                      <ShieldCheck className="absolute -bottom-1 -right-1 w-4 h-4 text-success" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{contact.name}</span>
                      {contact.isFavorite && <Star className="w-3 h-3 text-warning fill-warning" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.source === "ai" ? "bg-primary/20 text-primary" :
                      contact.source === "community" ? "bg-info/20 text-info" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {contact.source === "ai" ? "AI" : contact.source === "community" ? "Community" : "Manual"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
