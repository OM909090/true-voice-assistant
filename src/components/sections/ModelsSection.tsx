import { Plug, Key, CheckCircle } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";
import { CodeBlock } from "@/components/ui/CodeBlock";

const models = [
  {
    name: "OpenAI",
    provider: "GPT-4 / GPT-4o",
    features: ["Best reasoning", "Function calling", "Multi-modal"],
    color: "bg-success/20 text-success border-success/30",
  },
  {
    name: "Gemini",
    provider: "Google AI",
    features: ["Fast responses", "Long context", "Cost effective"],
    color: "bg-info/20 text-info border-info/30",
  },
  {
    name: "Custom",
    provider: "Self-hosted",
    features: ["Full privacy", "No API costs", "Customizable"],
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
];

const configSchema = `{
  "model_name": "string",
  "api_key": "string (encrypted)",
  "stt": true,
  "tts": true,
  "tool_calling": true,
  "max_tokens": 4096,
  "temperature": 0.7
}`;

export function ModelsSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={<Plug className="w-4 h-4" />} title="Pluggable AI Models">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {models.map((model, index) => (
            <div
              key={model.name}
              className={`rounded-xl p-5 border ${model.color} animate-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h4 className="font-semibold text-foreground mb-1">{model.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{model.provider}</p>
              <ul className="space-y-2">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3 h-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-foreground">Model Configuration</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Each user can select their preferred AI provider and configure their API key securely. 
            Keys are encrypted locally and never transmitted to TRUE AI servers.
          </p>
          <CodeBlock code={configSchema} />
        </div>
      </SectionCard>
    </div>
  );
}
