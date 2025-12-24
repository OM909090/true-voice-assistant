-- Create contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'ai', 'community')),
  is_spam BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create call_logs table
CREATE TABLE public.call_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES public.contacts(id),
  phone_number TEXT NOT NULL,
  caller_name TEXT,
  call_type TEXT NOT NULL CHECK (call_type IN ('incoming', 'outgoing', 'missed')),
  duration_seconds INTEGER DEFAULT 0,
  is_spam BOOLEAN DEFAULT false,
  ai_handled BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voice_messages table
CREATE TABLE public.voice_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_log_id UUID REFERENCES public.call_logs(id),
  phone_number TEXT NOT NULL,
  audio_url TEXT,
  transcript TEXT,
  summary TEXT,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_interactions table for logging agent actions
CREATE TABLE public.ai_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_input TEXT NOT NULL,
  detected_intent TEXT,
  confidence DECIMAL(3,2),
  ai_plan JSONB,
  tools_executed JSONB,
  final_response TEXT,
  language TEXT DEFAULT 'en',
  mode TEXT DEFAULT 'assistant' CHECK (mode IN ('assistant', 'agent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spam_database table
CREATE TABLE public.spam_database (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL UNIQUE,
  spam_score INTEGER DEFAULT 0,
  report_count INTEGER DEFAULT 1,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_contacts_phone ON public.contacts(phone_number);
CREATE INDEX idx_call_logs_phone ON public.call_logs(phone_number);
CREATE INDEX idx_call_logs_created ON public.call_logs(created_at DESC);
CREATE INDEX idx_spam_phone ON public.spam_database(phone_number);

-- Enable RLS on all tables
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spam_database ENABLE ROW LEVEL SECURITY;

-- Create public read/write policies (for demo - in production use auth.uid())
CREATE POLICY "Allow public access to contacts" ON public.contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to call_logs" ON public.call_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to voice_messages" ON public.voice_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to ai_interactions" ON public.ai_interactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to spam_database" ON public.spam_database FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_spam_updated_at BEFORE UPDATE ON public.spam_database FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();