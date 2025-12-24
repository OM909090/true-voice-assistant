import { useState, useEffect } from "react";
import { Search, Plus, Users, ShieldCheck, Star, Mic, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone_number: string;
  is_verified?: boolean;
  is_favorite?: boolean;
  source: string;
}

export function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (showFavorites && !contact.is_favorite) return false;
    if (!searchQuery) return true;
    return contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           contact.phone_number.includes(searchQuery);
  });

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const letter = contact.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(contact);
    return acc;
  }, {} as Record<string, Contact[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          All ({contacts.length})
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
      {Object.keys(groupedContacts).length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-2">No contacts yet</p>
          <p className="text-sm text-muted-foreground">
            Say "Save this number as Mom" to add a contact
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedContacts).sort().map(([letter, letterContacts]) => (
            <div key={letter}>
              <p className="text-sm font-medium text-primary mb-2 px-1">{letter}</p>
              <div className="space-y-2">
                {letterContacts.map((contact) => (
                  <button
                    key={contact.id}
                    className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all active:scale-[0.98]"
                  >
                    <div className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {contact.name.charAt(0).toUpperCase()}
                      {contact.is_verified && (
                        <ShieldCheck className="absolute -bottom-1 -right-1 w-4 h-4 text-success" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{contact.name}</span>
                        {contact.is_favorite && <Star className="w-3 h-3 text-warning fill-warning" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.phone_number}</p>
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
      )}
    </div>
  );
}
