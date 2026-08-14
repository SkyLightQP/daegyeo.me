import { FC } from 'react';
import SectionEntry from './SectionEntry';
import StackBlock from './blocks/StackBlock';
import ArticleBlock from './blocks/ArticleBlock';
import { cn, descriptionLinkClass, formatPeriod, renderDescription } from '../lib/utils';
import type { ContentData, SectionData } from '../types/content';

type SectionBlocksProps = {
  sections: SectionData[];
  contents: ContentData[];
  className?: string;
};

const SectionBlocks: FC<SectionBlocksProps> = ({ sections, contents, className }) => {
  if (sections.length === 0) return null;

  const groups = sections.map((section) => ({
    section,
    items: contents
      .filter((content) => content.section_id === section.id && !content.is_hidden)
      .sort((a, b) => a.priority - b.priority),
  }));

  return (
    <div className={cn('space-y-16', className)}>
      {groups.map(({ section, items }) => {
        if (section.type === 'STACK') {
          return (
            <StackBlock key={section.id} title={section.name}>
              {items[0]?.subtitle}
            </StackBlock>
          );
        }

        const entries = items.length > 0 && (
          <div className="space-y-6">
            {items.map((item) => (
              <SectionEntry
                key={item.id}
                title={
                  <>
                    {item.title}&nbsp;
                    <span className="text-sm">{formatPeriod(item.date_range)}</span>
                  </>
                }
                subtitle={item.subtitle}
              >
                {item.description.trim() && (
                  <div
                    className={descriptionLinkClass}
                    dangerouslySetInnerHTML={{ __html: renderDescription(item.description) }}
                  />
                )}
              </SectionEntry>
            ))}
          </div>
        );

        if (section.type === 'ARTICLE') {
          return (
            <ArticleBlock key={section.id} title={section.name}>
              {entries}
            </ArticleBlock>
          );
        }

        return (
          <div key={section.id}>
            <h2 className="mb-3 text-xl font-bold">{section.name}</h2>

            {entries}
          </div>
        );
      })}
    </div>
  );
};

export default SectionBlocks;
