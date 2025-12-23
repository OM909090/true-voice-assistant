import { Database, Table } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";

interface SchemaField {
  name: string;
  type: string;
  constraint?: string;
}

interface TableSchema {
  name: string;
  fields: SchemaField[];
}

const schemas: TableSchema[] = [
  {
    name: "users",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "phone_number", type: "VARCHAR(20)", constraint: "UNIQUE" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "ai_provider", type: "ENUM" },
      { name: "api_key_encrypted", type: "TEXT" },
      { name: "voice_preference", type: "JSONB" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "contacts",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "user_id", type: "UUID", constraint: "FOREIGN KEY" },
      { name: "phone_number", type: "VARCHAR(20)" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "source", type: "ENUM" },
      { name: "verified", type: "BOOLEAN" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "call_logs",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "user_id", type: "UUID", constraint: "FOREIGN KEY" },
      { name: "phone_number", type: "VARCHAR(20)" },
      { name: "call_type", type: "ENUM" },
      { name: "duration", type: "INTEGER" },
      { name: "ai_summary", type: "TEXT" },
      { name: "timestamp", type: "TIMESTAMP" },
    ],
  },
  {
    name: "voice_messages",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "call_log_id", type: "UUID", constraint: "FOREIGN KEY" },
      { name: "audio_url", type: "TEXT" },
      { name: "transcription", type: "TEXT" },
      { name: "language", type: "VARCHAR(10)" },
      { name: "sentiment", type: "JSONB" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "spam_database",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "phone_number", type: "VARCHAR(20)", constraint: "INDEXED" },
      { name: "spam_score", type: "FLOAT" },
      { name: "reports", type: "INTEGER" },
      { name: "updated_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "ai_interactions",
    fields: [
      { name: "id", type: "UUID", constraint: "PRIMARY KEY" },
      { name: "user_id", type: "UUID", constraint: "FOREIGN KEY" },
      { name: "command", type: "TEXT" },
      { name: "intent", type: "VARCHAR(100)" },
      { name: "response", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
];

function TableCard({ table }: { table: TableSchema }) {
  return (
    <div className="bg-secondary/30 rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
        <Table className="w-4 h-4 text-primary" />
        <span className="font-mono font-medium text-foreground">{table.name}</span>
      </div>
      <div className="p-4 space-y-1.5">
        {table.fields.map((field) => (
          <div key={field.name} className="flex items-start gap-2 font-mono text-sm">
            <span className="text-primary">{field.name}</span>
            <span className="text-muted-foreground">{field.type}</span>
            {field.constraint && (
              <span className="text-xs text-info">{field.constraint}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DatabaseSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Database className="w-4 h-4" />} title="Database Schema">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemas.map((table, index) => (
            <div
              key={table.name}
              className="animate-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCard table={table} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
