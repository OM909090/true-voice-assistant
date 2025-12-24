import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone_number } = await req.json();
    
    if (!phone_number) {
      throw new Error('Phone number is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log(`Looking up caller ID for: ${phone_number}`);

    // Step 1: Check local contacts
    const { data: contact } = await supabase
      .from('contacts')
      .select('*')
      .eq('phone_number', phone_number)
      .maybeSingle();

    if (contact) {
      console.log(`Found in contacts: ${contact.name}`);
      return new Response(JSON.stringify({
        found: true,
        source: 'contacts',
        name: contact.name,
        is_spam: contact.is_spam,
        is_verified: contact.is_verified,
        phone_number
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Check spam database
    const { data: spam } = await supabase
      .from('spam_database')
      .select('*')
      .eq('phone_number', phone_number)
      .maybeSingle();

    if (spam && spam.spam_score >= 50) {
      console.log(`Found in spam database with score: ${spam.spam_score}`);
      return new Response(JSON.stringify({
        found: true,
        source: 'spam_database',
        name: `Suspected Spam`,
        is_spam: true,
        spam_score: spam.spam_score,
        spam_category: spam.category,
        phone_number
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: Check community database (call logs with names)
    const { data: communityMatch } = await supabase
      .from('call_logs')
      .select('caller_name')
      .eq('phone_number', phone_number)
      .not('caller_name', 'is', null)
      .limit(1)
      .maybeSingle();

    if (communityMatch?.caller_name) {
      console.log(`Found in community: ${communityMatch.caller_name}`);
      return new Response(JSON.stringify({
        found: true,
        source: 'community',
        name: communityMatch.caller_name,
        is_spam: false,
        is_verified: false,
        phone_number
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 4: AI inference based on number pattern
    let inferredType = 'Unknown';
    const cleanNumber = phone_number.replace(/\D/g, '');
    
    // Simple pattern matching for demo
    if (cleanNumber.startsWith('1800') || cleanNumber.startsWith('1860')) {
      inferredType = 'Toll-Free / Business';
    } else if (cleanNumber.length === 10 && ['6', '7', '8', '9'].includes(cleanNumber[0])) {
      inferredType = 'Mobile Number';
    } else if (cleanNumber.length === 11 && cleanNumber.startsWith('0')) {
      inferredType = 'Landline';
    }

    console.log(`No match found, inferred type: ${inferredType}`);

    return new Response(JSON.stringify({
      found: false,
      source: 'ai_inference',
      name: inferredType,
      is_spam: false,
      is_verified: false,
      phone_number
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Caller ID error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      found: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
