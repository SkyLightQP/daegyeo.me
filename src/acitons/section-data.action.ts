'use server';

import { SchemaType } from '../types/type-util';
import { createSupabaseClient } from '../utils/supabase/server';

export type SectionType = Array<
  SchemaType<'sections'> & {
    contents: Array<SchemaType<'contents'> & { links: SchemaType<'links'>[]; images: SchemaType<'images'>[] }>;
  }
>;

export const getSectionData = async () => {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('sections')
    .select('*, contents(*, links(*), images(*))')
    .eq('contents.isHidden', false)
    .order('id', { ascending: true });
  return {
    sections: data as SectionType,
    error
  };
};

export const getPdfSectionData = async () => {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('sections')
    .select('*, contents(*, links(*), images(*))')
    .eq('showPdf', true)
    .eq('contents.isHidden', false)
    .eq('contents.showPdf', true)
    .order('id', { ascending: true });
  return {
    sections: data as SectionType,
    error
  };
};
