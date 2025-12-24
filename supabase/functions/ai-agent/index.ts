import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tool definitions for the AI agent
const AVAILABLE_TOOLS = [
  {
    type: "function",
    function: {
      name: "find_contact",
      description: "Find a contact by name or phone number",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Name or phone number to search" }
        },
        required: ["query"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "save_contact",
      description: "Save a new contact with name and phone number",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Contact name" },
          phone_number: { type: "string", description: "Phone number" }
        },
        required: ["name", "phone_number"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "read_call_logs",
      description: "Read recent call logs",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Number of logs to retrieve", default: 5 }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "make_call",
      description: "Initiate a call to a contact or number",
      parameters: {
        type: "object",
        properties: {
          number: { type: "string", description: "Phone number to call" },
          message: { type: "string", description: "Optional message to deliver" }
        },
        required: ["number"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "block_number",
      description: "Block a spam number",
      parameters: {
        type: "object",
        properties: {
          phone_number: { type: "string", description: "Phone number to block" },
          reason: { type: "string", description: "Reason for blocking" }
        },
        required: ["phone_number"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "check_spam",
      description: "Check if a number is spam",
      parameters: {
        type: "object",
        properties: {
          phone_number: { type: "string", description: "Phone number to check" }
        },
        required: ["phone_number"]
      }
    }
  }
];

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are TRUE AI, a mobile voice-based AI agent for caller ID and call automation.

Rules:
- You are helpful, concise, and friendly
- You support all languages, with priority on Indian languages especially Odia
- You help users manage calls, contacts, and identify callers
- For actions, you MUST use the available tools
- Always confirm sensitive actions like blocking numbers or making calls
- Respond naturally as a voice assistant would

Available capabilities:
- Find and save contacts
- Read call history
- Identify callers and detect spam
- Make calls with messages
- Block spam numbers

When a user asks to call someone, find the contact first, then initiate the call.
When asked about recent calls, read the call logs and summarize them naturally.
Always be helpful and proactive in suggesting relevant actions.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, mode = 'assistant', language = 'en' } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`Processing ${mode} request: "${message}" in ${language}`);

    // Call Lovable AI Gateway with tool calling
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        tools: AVAILABLE_TOOLS,
        tool_choice: 'auto',
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          response: "I'm a bit busy right now. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const choice = aiData.choices[0];
    
    let response = '';
    let toolResults: any[] = [];
    let plan: any[] = [];
    let intent = 'general_query';
    let confidence = 0.9;

    // Check if AI wants to call tools
    if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
      console.log('Tool calls requested:', choice.message.tool_calls);
      
      for (const toolCall of choice.message.tool_calls) {
        const toolName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        
        plan.push({ tool: toolName, arguments: args });
        
        let result: any = { status: 'success' };
        
        // Execute tools
        switch (toolName) {
          case 'find_contact': {
            const { data } = await supabase
              .from('contacts')
              .select('*')
              .or(`name.ilike.%${args.query}%,phone_number.ilike.%${args.query}%`)
              .limit(5);
            result = { contacts: data || [], found: (data?.length || 0) > 0 };
            intent = 'find_contact';
            break;
          }
          
          case 'save_contact': {
            const { data, error } = await supabase
              .from('contacts')
              .insert({ name: args.name, phone_number: args.phone_number, source: 'ai' })
              .select()
              .single();
            result = error ? { error: error.message } : { saved: true, contact: data };
            intent = 'save_contact';
            break;
          }
          
          case 'read_call_logs': {
            const limit = args.limit || 5;
            const { data } = await supabase
              .from('call_logs')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(limit);
            result = { logs: data || [] };
            intent = 'read_call_logs';
            break;
          }
          
          case 'make_call': {
            // Simulate call initiation (in real app, this would trigger native call)
            result = { 
              status: 'initiated', 
              number: args.number, 
              message: args.message,
              action: 'CALL_INITIATED'
            };
            intent = 'make_call';
            break;
          }
          
          case 'block_number': {
            const { error } = await supabase
              .from('spam_database')
              .upsert({ 
                phone_number: args.phone_number, 
                category: args.reason || 'user_blocked',
                spam_score: 100 
              });
            result = error ? { error: error.message } : { blocked: true };
            intent = 'block_number';
            break;
          }
          
          case 'check_spam': {
            const { data } = await supabase
              .from('spam_database')
              .select('*')
              .eq('phone_number', args.phone_number)
              .maybeSingle();
            result = { 
              is_spam: !!data, 
              spam_score: data?.spam_score || 0,
              category: data?.category 
            };
            intent = 'check_spam';
            break;
          }
        }
        
        toolResults.push({ tool: toolName, result });
      }
      
      // Get final response from AI with tool results
      const finalResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
            choice.message,
            ...choice.message.tool_calls.map((tc: any, i: number) => ({
              role: 'tool',
              tool_call_id: tc.id,
              content: JSON.stringify(toolResults[i].result)
            }))
          ],
        }),
      });
      
      if (finalResponse.ok) {
        const finalData = await finalResponse.json();
        response = finalData.choices[0].message.content;
      }
    } else {
      // No tool calls, use direct response
      response = choice.message.content;
    }

    // Log the interaction
    await supabase.from('ai_interactions').insert({
      user_input: message,
      detected_intent: intent,
      confidence,
      ai_plan: plan.length > 0 ? plan : null,
      tools_executed: toolResults.length > 0 ? toolResults : null,
      final_response: response,
      language,
      mode
    });

    console.log(`Response: "${response}"`);

    return new Response(JSON.stringify({
      response,
      intent,
      confidence,
      plan,
      tools_executed: toolResults,
      mode
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('AI Agent error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      response: "I'm sorry, I encountered an error. Please try again."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
