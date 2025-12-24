export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_interactions: {
        Row: {
          ai_plan: Json | null
          confidence: number | null
          created_at: string
          detected_intent: string | null
          final_response: string | null
          id: string
          language: string | null
          mode: string | null
          tools_executed: Json | null
          user_input: string
        }
        Insert: {
          ai_plan?: Json | null
          confidence?: number | null
          created_at?: string
          detected_intent?: string | null
          final_response?: string | null
          id?: string
          language?: string | null
          mode?: string | null
          tools_executed?: Json | null
          user_input: string
        }
        Update: {
          ai_plan?: Json | null
          confidence?: number | null
          created_at?: string
          detected_intent?: string | null
          final_response?: string | null
          id?: string
          language?: string | null
          mode?: string | null
          tools_executed?: Json | null
          user_input?: string
        }
        Relationships: []
      }
      call_logs: {
        Row: {
          ai_handled: boolean | null
          call_type: string
          caller_name: string | null
          contact_id: string | null
          created_at: string
          duration_seconds: number | null
          id: string
          is_spam: boolean | null
          phone_number: string
        }
        Insert: {
          ai_handled?: boolean | null
          call_type: string
          caller_name?: string | null
          contact_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_spam?: boolean | null
          phone_number: string
        }
        Update: {
          ai_handled?: boolean | null
          call_type?: string
          caller_name?: string | null
          contact_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          is_spam?: boolean | null
          phone_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          id: string
          is_favorite: boolean | null
          is_spam: boolean | null
          is_verified: boolean | null
          name: string
          phone_number: string
          source: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          is_spam?: boolean | null
          is_verified?: boolean | null
          name: string
          phone_number: string
          source?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_favorite?: boolean | null
          is_spam?: boolean | null
          is_verified?: boolean | null
          name?: string
          phone_number?: string
          source?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      spam_database: {
        Row: {
          category: string | null
          created_at: string
          id: string
          phone_number: string
          report_count: number | null
          spam_score: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          phone_number: string
          report_count?: number | null
          spam_score?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          phone_number?: string
          report_count?: number | null
          spam_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      voice_messages: {
        Row: {
          audio_url: string | null
          call_log_id: string | null
          created_at: string
          duration_seconds: number | null
          id: string
          phone_number: string
          summary: string | null
          transcript: string | null
        }
        Insert: {
          audio_url?: string | null
          call_log_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          phone_number: string
          summary?: string | null
          transcript?: string | null
        }
        Update: {
          audio_url?: string | null
          call_log_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          id?: string
          phone_number?: string
          summary?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_messages_call_log_id_fkey"
            columns: ["call_log_id"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
