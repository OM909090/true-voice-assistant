import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "json", className }: CodeBlockProps) {
  return (
    <div className={cn("relative", className)}>
      {language && (
        <span className="absolute top-2 right-2 text-xs text-muted-foreground font-mono uppercase">
          {language}
        </span>
      )}
      <pre className="code-block">
        <code className="text-muted-foreground">{code}</code>
      </pre>
    </div>
  );
}
