import { Wrench } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface Tool {
  name: string;
  description: string;
  schema: string;
}

const tools: Tool[] = [
  {
    name: "make_call",
    description: "Initiates a phone call to a contact or number",
    schema: `{
  "name": "make_call",
  "parameters": {
    "phone_number": "string",
    "contact_name": "string (optional)",
    "message": "string (optional)"
  }
}`,
  },
  {
    name: "save_contact",
    description: "Saves a new contact or updates existing one",
    schema: `{
  "name": "save_contact",
  "parameters": {
    "phone_number": "string",
    "name": "string",
    "notes": "string (optional)"
  }
}`,
  },
  {
    name: "get_call_logs",
    description: "Retrieves call history with optional filters",
    schema: `{
  "name": "get_call_logs",
  "parameters": {
    "limit": "integer",
    "filter": "enum [all, missed, received, dialed]",
    "date_range": "string (optional)"
  }
}`,
  },
  {
    name: "block_number",
    description: "Blocks a phone number from calling",
    schema: `{
  "name": "block_number",
  "parameters": {
    "phone_number": "string",
    "reason": "string (optional)"
  }
}`,
  },
  {
    name: "search_contacts",
    description: "Searches contacts by name or number",
    schema: `{
  "name": "search_contacts",
  "parameters": {
    "query": "string",
    "match_type": "enum [exact, fuzzy]"
  }
}`,
  },
  {
    name: "transcribe_audio",
    description: "Converts voice message to text",
    schema: `{
  "name": "transcribe_audio",
  "parameters": {
    "audio_url": "string",
    "language": "string (optional)",
    "include_sentiment": "boolean"
  }
}`,
  },
];

export function ToolsSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Wrench className="w-4 h-4" />} title="AI Agent Tool Definitions">
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="bg-secondary/30 rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div>
                  <h4 className="font-mono font-semibold text-foreground">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                </div>
                <StatusBadge variant="tool">Tool</StatusBadge>
              </div>
              <div className="p-4">
                <CodeBlock code={tool.schema} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
