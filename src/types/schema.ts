export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      contents: {
        Row: {
          createdAt: string;
          description: string;
          hasMargin: boolean;
          id: number;
          images: Json;
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
          images?: Json;
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
          images?: Json;
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
            isOneToOne: false;
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
            isOneToOne: false;
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
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
