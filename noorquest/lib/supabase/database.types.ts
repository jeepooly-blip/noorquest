export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      parents: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          preferred_language: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          preferred_language?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['parents']['Insert']>;
      };
      children: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          avatar_url: string | null;
          age: number;
          language: string;
          pin_hash: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          avatar_url?: string | null;
          age: number;
          language?: string;
          pin_hash?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['children']['Insert']>;
      };
      progress: {
        Row: {
          id: number;
          child_id: string;
          module_key: string;
          score: number | null;
          completed_at: string | null;
          data: Json | null;
        };
        Insert: {
          id?: number;
          child_id: string;
          module_key: string;
          score?: number | null;
          completed_at?: string | null;
          data?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['progress']['Insert']>;
      };
      badges: {
        Row: {
          id: number;
          child_id: string;
          badge_type: string;
          earned_at: string;
        };
        Insert: {
          id?: number;
          child_id: string;
          badge_type: string;
          earned_at?: string;
        };
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };
    };
  };
}
