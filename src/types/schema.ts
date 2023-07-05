export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      contents: {
        Row: {
          createdAt: string;
          description: string;
          hasMargin: boolean;
          id: number;
          isHidden: boolean;
          order: number;
          sectionId: number;
          stack: string;
          subtitle: string;
          title: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          description: string;
          hasMargin: boolean;
          id?: number;
          isHidden: boolean;
          order: number;
          sectionId: number;
          stack: string;
          subtitle: string;
          title: string;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          description?: string;
          hasMargin?: boolean;
          id?: number;
          isHidden?: boolean;
          order?: number;
          sectionId?: number;
          stack?: string;
          subtitle?: string;
          title?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'contents_sectionId_fkey';
            columns: ['sectionId'];
            referencedRelation: 'sections';
            referencedColumns: ['id'];
          }
        ];
      };
      links: {
        Row: {
          contentId: number;
          createdAt: string;
          href: string;
          id: number;
          name: string;
          order: number;
          updatedAt: string;
        };
        Insert: {
          contentId: number;
          createdAt?: string;
          href: string;
          id?: number;
          name: string;
          order: number;
          updatedAt?: string;
        };
        Update: {
          contentId?: number;
          createdAt?: string;
          href?: string;
          id?: number;
          name?: string;
          order?: number;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'links_contentId_fkey';
            columns: ['contentId'];
            referencedRelation: 'contents';
            referencedColumns: ['id'];
          }
        ];
      };
      sections: {
        Row: {
          createdAt: string;
          id: number;
          order: number;
          title: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          order: number;
          title: string;
          updatedAt?: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          order?: number;
          title?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
