import { useState, useEffect } from "react";
import { Mic, MicOff, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceAssistantProps {
  onClose: () => void;
}

type AssistantState = "idle" | "listening" | "processing" | "speaking";

const sampleResponses = [
  { command: "Call Mom", response: "Calling Mom..." },
  { command: "Read my call log", response: "Yesterday at 6:20 PM, Ankit called you for 2 minutes. At 5:45 PM, you missed a call from an unknown number." },
  { command: "Save this number as Raj", response: "I've saved +91 98765 43210 as Raj in your contacts." },
  { command: "Block this number", response: "Done. I've blocked this number. You won't receive calls from them anymore." },
];

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [state, setState] = useState<AssistantState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const startListening = () => {
    setState("listening");
    setTranscript("");
    setResponse("");

    // Simulate voice recognition
    setTimeout(() => {
      const randomCommand = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setTranscript(randomCommand.command);
      setState("processing");

      setTimeout(() => {
        setResponse(randomCommand.response);
        setState("speaking");

        setTimeout(() => {
          setState("idle");
        }, 3000);
      }, 1000);
    }, 2000);
  };

  const stopListening = () => {
    setState("idle");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-slide-up">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-1000",
          state === "listening" && "bg-primary/30 scale-110",
          state === "processing" && "bg-info/30 animate-pulse",
          state === "speaking" && "bg-success/20",
          state === "idle" && "bg-primary/10"
        )} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">TRUE AI</h2>
            <p className="text-xs text-muted-foreground">
              {state === "listening" && "Listening..."}
              {state === "processing" && "Processing..."}
              {state === "speaking" && "Speaking..."}
              {state === "idle" && "Tap to speak"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8">
        {/* Waveform visualization */}
        {state === "listening" && (
          <div className="flex items-center gap-1 mb-8 h-16">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full listening-wave"
                style={{
                  height: `${Math.random() * 40 + 20}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="text-center mb-8 animate-in">
            <p className="text-sm text-muted-foreground mb-2">You said:</p>
            <p className="text-xl font-medium text-foreground">"{transcript}"</p>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="text-center max-w-sm animate-in">
            <p className="text-lg text-foreground leading-relaxed">{response}</p>
          </div>
        )}

        {/* Idle prompt */}
        {state === "idle" && !transcript && !response && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Try saying:</p>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">"Call Mom and say I'll be late"</p>
              <p className="text-sm text-foreground/80">"Read my call log"</p>
              <p className="text-sm text-foreground/80">"Who called me?"</p>
              <p className="text-sm text-foreground/80">"ମୋତେ ଶେଷ କଲ୍‌ଟା କହ" (Odia)</p>
            </div>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <div className="relative z-10 flex justify-center pb-16">
        <button
          onClick={state === "listening" ? stopListening : startListening}
          disabled={state === "processing" || state === "speaking"}
          className={cn(
            "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
            state === "listening"
              ? "bg-destructive"
              : "bg-gradient-primary glow-primary",
            (state === "processing" || state === "speaking") && "opacity-50"
          )}
        >
          {state === "listening" && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-destructive animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full border-4 border-destructive animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            </>
          )}
          {state === "listening" ? (
            <MicOff className="w-8 h-8 text-destructive-foreground" />
          ) : (
            <Mic className="w-8 h-8 text-primary-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
