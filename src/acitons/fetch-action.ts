'use server';

import { supabaseClient } from '../utils/supabase';
import { SchemaType } from '../types/type-util';

export type SectionType = Array<
  SchemaType<'sections'> & {
    contents: Array<SchemaType<'contents'> & { links: SchemaType<'links'>[]; images: SchemaType<'images'>[] }>;
  }
>;

export const getPageData = async () => {
  const { data, error } = await supabaseClient
    .from('sections')
    .select('*, contents(*, links(*), images(*))')
    .eq('contents.isHidden', false)
    .order('id', { ascending: true });
  return {
    sections: data as SectionType,
    error
  };
};
