import { supabase } from "@/integrations/supabase/client";

export interface AIResponse {
  response: string;
  intent: string;
  confidence: number;
  plan: Array<{ tool: string; arguments: Record<string, any> }>;
  tools_executed: Array<{ tool: string; result: any }>;
  mode: 'assistant' | 'agent';
}

export interface CallerIDResult {
  found: boolean;
  source: 'contacts' | 'spam_database' | 'community' | 'ai_inference';
  name: string;
  is_spam: boolean;
  is_verified?: boolean;
  spam_score?: number;
  spam_category?: string;
  phone_number: string;
}

export const sendToAIAgent = async (
  message: string,
  mode: 'assistant' | 'agent' = 'assistant',
  language: string = 'en'
): Promise<AIResponse> => {
  console.log(`Sending to AI Agent: "${message}" (${mode} mode, ${language})`);
  
  const { data, error } = await supabase.functions.invoke('ai-agent', {
    body: { message, mode, language }
  });

  if (error) {
    console.error('AI Agent error:', error);
    throw new Error(error.message || 'Failed to communicate with AI agent');
  }

  return data as AIResponse;
};

export const lookupCallerID = async (phoneNumber: string): Promise<CallerIDResult> => {
  console.log(`Looking up caller ID for: ${phoneNumber}`);
  
  const { data, error } = await supabase.functions.invoke('caller-id', {
    body: { phone_number: phoneNumber }
  });

  if (error) {
    console.error('Caller ID error:', error);
    throw new Error(error.message || 'Failed to lookup caller ID');
  }

  return data as CallerIDResult;
};

// Voice synthesis using Web Speech API
export const speak = (text: string, lang: string = 'en-US'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    
    window.speechSynthesis.speak(utterance);
  });
};

// Speech recognition using Web Speech API
export const startListening = (
  onResult: (text: string) => void,
  onEnd: () => void,
  lang: string = 'en-US'
): (() => void) => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported');
    onEnd();
    return () => {};
  }

  const recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onresult = (event: any) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    onResult(text);
  };

  recognition.onend = onEnd;
  recognition.onerror = (e: any) => {
    console.error('Speech recognition error:', e);
    onEnd();
  };

  recognition.start();

  return () => {
    recognition.stop();
  };
};

// Language detection based on text patterns
export const detectLanguage = (text: string): string => {
  // Odia Unicode range: \u0B00-\u0B7F
  if (/[\u0B00-\u0B7F]/.test(text)) return 'or-IN';
  // Hindi Unicode range: \u0900-\u097F  
  if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
  // Bengali Unicode range: \u0980-\u09FF
  if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN';
  // Tamil Unicode range: \u0B80-\u0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN';
  // Telugu Unicode range: \u0C00-\u0C7F
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN';
  
  return 'en-US';
};
