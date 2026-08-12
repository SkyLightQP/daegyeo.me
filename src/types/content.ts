export type SectionData = {
  id: number;
  name: string;
  type: string;
};

export type ContentData = {
  id: number;
  title: string;
  subtitle: string;
  date_range: string;
  description: string;
  section_id: number;
  priority: number;
  is_hidden: boolean;
};
