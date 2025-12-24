import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, X, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendToAIAgent, speak, startListening, detectLanguage } from "@/services/aiService";
import { toast } from "sonner";

interface VoiceAssistantProps {
  onClose: () => void;
}

type AssistantState = "idle" | "listening" | "processing" | "speaking";

export function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const [state, setState] = useState<AssistantState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);

  const processVoiceCommand = useCallback(async (text: string) => {
    if (!text.trim()) {
      setState("idle");
      return;
    }

    setState("processing");
    
    try {
      const language = detectLanguage(text);
      const langCode = language.split('-')[0];
      
      console.log(`Processing: "${text}" in ${language}`);
      
      const result = await sendToAIAgent(text, 'assistant', langCode);
      
      setResponse(result.response);
      
      // Track tools used
      if (result.tools_executed?.length > 0) {
        const tools = result.tools_executed.map(t => t.tool);
        setToolsUsed(tools);
        toast.success(`Executed: ${tools.join(', ')}`);
      }
      
      // Speak the response
      setState("speaking");
      await speak(result.response, language);
      setState("idle");
      
    } catch (error) {
      console.error('AI processing error:', error);
      const errorMsg = "I'm sorry, I couldn't process that. Please try again.";
      setResponse(errorMsg);
      toast.error('Failed to process voice command');
      setState("idle");
    }
  }, []);

  const handleListeningEnd = useCallback(() => {
    setState("idle");
    if (transcript.trim()) {
      processVoiceCommand(transcript);
    }
  }, [transcript, processVoiceCommand]);

  const handleVoiceResult = useCallback((text: string) => {
    setTranscript(text);
  }, []);

  const startListeningHandler = () => {
    setState("listening");
    setTranscript("");
    setResponse("");
    setToolsUsed([]);

    // Try Web Speech API first
    const stop = startListening(
      handleVoiceResult,
      () => {
        // On end, process the command
        setState((currentState) => {
          if (currentState === "listening") {
            return "idle";
          }
          return currentState;
        });
      },
      'en-US'
    );
    
    setStopListeningFn(() => stop);

    // Auto-stop after 10 seconds
    setTimeout(() => {
      if (stopListeningFn) {
        stopListeningFn();
      }
      setState((currentState) => {
        if (currentState === "listening" && transcript.trim()) {
          processVoiceCommand(transcript);
        }
        return currentState === "listening" ? "idle" : currentState;
      });
    }, 10000);
  };

  const stopListeningHandler = () => {
    if (stopListeningFn) {
      stopListeningFn();
      setStopListeningFn(null);
    }
    
    if (transcript.trim()) {
      processVoiceCommand(transcript);
    } else {
      setState("idle");
    }
  };

  useEffect(() => {
    return () => {
      if (stopListeningFn) {
        stopListeningFn();
      }
      window.speechSynthesis?.cancel();
    };
  }, [stopListeningFn]);

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
              {state === "processing" && "Processing with AI..."}
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

        {/* Processing indicator */}
        {state === "processing" && (
          <div className="mb-8">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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
            {toolsUsed.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {toolsUsed.map((tool, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Idle prompt */}
        {state === "idle" && !transcript && !response && (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Try saying:</p>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">"Call Mom and say I'll be late"</p>
              <p className="text-sm text-foreground/80">"Read my call log"</p>
              <p className="text-sm text-foreground/80">"Save this number as Raj"</p>
              <p className="text-sm text-foreground/80">"Block this spam number"</p>
              <p className="text-sm text-foreground/80">"ମୋତେ ଶେଷ କଲ୍‌ଟା କହ" (Odia)</p>
            </div>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <div className="relative z-10 flex justify-center pb-16">
        <button
          onClick={state === "listening" ? stopListeningHandler : startListeningHandler}
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
