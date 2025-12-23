import { Phone, PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";
import { useState } from "react";

interface IncomingCallProps {
  callerName: string;
  callerNumber: string;
  isSpam?: boolean;
  spamScore?: number;
  onAnswer: () => void;
  onDecline: () => void;
  onAIAnswer?: () => void;
}

export function IncomingCall({
  callerName,
  callerNumber,
  isSpam,
  spamScore,
  onAnswer,
  onDecline,
  onAIAnswer,
}: IncomingCallProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between py-16 px-8 animate-in">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
      </div>

      {/* Caller Info */}
      <div className="relative z-10 text-center">
        <p className="text-sm text-muted-foreground mb-2">Incoming Call</p>
        
        {/* Avatar with pulse */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gradient-primary opacity-30 animate-pulse" />
          <div className={`relative w-full h-full rounded-full flex items-center justify-center text-4xl font-bold ${isSpam ? 'bg-spam/20 text-spam' : 'bg-card text-primary'}`}>
            {callerName.charAt(0).toUpperCase()}
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-1 ${isSpam ? 'text-spam' : 'text-foreground'}`}>
          {isSpam ? "⚠️ Suspected Spam" : callerName}
        </h2>
        <p className="text-muted-foreground">{callerNumber}</p>
        
        {isSpam && spamScore && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-spam/20 text-spam text-sm">
            <span>Spam likelihood: {Math.round(spamScore * 100)}%</span>
          </div>
        )}
      </div>

      {/* AI Answer Option */}
      {onAIAnswer && (
        <button
          onClick={onAIAnswer}
          className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground">AI Agent Answer</p>
            <p className="text-xs text-muted-foreground">Let AI take a message</p>
          </div>
        </button>
      )}

      {/* Action Buttons */}
      <div className="relative z-10 flex items-center gap-8">
        <button
          onClick={onDecline}
          className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          <PhoneOff className="w-7 h-7 text-destructive-foreground" />
        </button>
        
        <button
          onClick={onAnswer}
          className="w-20 h-20 rounded-full bg-success flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95 glow-sm"
          style={{ boxShadow: '0 0 30px hsl(var(--success) / 0.4)' }}
        >
          <Phone className="w-8 h-8 text-success-foreground" />
        </button>
      </div>
    </div>
  );
}
