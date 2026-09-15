/**
 * Handgeschriebene Typen passend zum Schema in supabase/phase5-setup.sql.
 * Sobald die Supabase CLI mit dem Projekt verknüpft ist, können diese
 * jederzeit ersetzt werden durch:
 *   npx supabase gen types typescript --project-id <project-id> > lib/database.types.ts
 *
 * Form (Relationships: [] etc.) folgt exakt der von
 * @supabase/postgrest-js erwarteten GenericSchema-Struktur.
 */
export type ReviewStatus = "pending" | "approved" | "rejected";

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          created_at?: string;
          read?: boolean;
        };
        Update: Partial<{
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
          read: boolean;
        }>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          email: string;
          rating: number;
          text: string;
          status: ReviewStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          rating: number;
          text: string;
          status?: ReviewStatus;
          created_at?: string;
        };
        Update: Partial<{
          id: string;
          name: string;
          email: string;
          rating: number;
          text: string;
          status: ReviewStatus;
          created_at: string;
        }>;
        Relationships: [];
      };
    };
    Views: {
      approved_reviews: {
        Row: {
          id: string;
          name: string;
          rating: number;
          text: string;
          created_at: string;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
  };
};
