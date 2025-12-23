import { Code } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionCard } from "@/components/ui/SectionCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

interface Endpoint {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description?: string;
  headers?: string;
  body?: string;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    name: "Caller ID Lookup",
    method: "GET",
    path: "/api/v1/caller-id/:phone_number",
    headers: "Authorization: Bearer {token}",
    response: `{
  "name": "string",
  "spam_score": "float",
  "verified": "boolean"
}`,
  },
  {
    name: "Voice Command",
    method: "POST",
    path: "/api/v1/voice/command",
    body: `{
  "audio": "base64",
  "language": "string"
}`,
    response: `{
  "intent": "string",
  "action": "object"
}`,
  },
  {
    name: "Save Contact",
    method: "POST",
    path: "/api/v1/contacts",
    body: `{
  "phone_number": "string",
  "name": "string",
  "source": "enum"
}`,
    response: `{
  "id": "uuid",
  "success": "boolean"
}`,
  },
  {
    name: "Get Call Logs",
    method: "GET",
    path: "/api/v1/calls?limit=50",
    response: `{
  "calls": [array],
  "total": "integer",
  "page": "integer"
}`,
  },
];

export function APISection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Code className="w-4 h-4" />} title="API Contracts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {endpoints.map((endpoint, index) => (
            <div
              key={endpoint.name}
              className="bg-secondary/30 rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all animate-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h4 className="font-medium text-foreground">{endpoint.name}</h4>
                <StatusBadge variant={endpoint.method === "GET" ? "get" : "post"}>
                  {endpoint.method}
                </StatusBadge>
              </div>
              <div className="p-4 space-y-3">
                <div className="font-mono text-sm text-primary bg-background/50 px-3 py-2 rounded-lg">
                  {endpoint.method} {endpoint.path}
                </div>
                
                {endpoint.headers && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Headers:</p>
                    <p className="text-sm font-mono text-muted-foreground">{endpoint.headers}</p>
                  </div>
                )}

                {endpoint.body && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Body:</p>
                    <CodeBlock code={endpoint.body} />
                  </div>
                )}

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Response:</p>
                  <CodeBlock code={endpoint.response} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
