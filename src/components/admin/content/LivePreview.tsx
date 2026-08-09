'use client';

import { FC } from 'react';
import { Introduce } from '../../blocks/Introduce';
import SocialLinks from '../../blocks/SocialLinks';
import SectionEntry from '../../SectionEntry';
import Footer from '../../Footer';
import { Content, formatPeriod } from './ContentCard';

export type PreviewSection = { id: number; name: string };

type LivePreviewProps = {
  sections: PreviewSection[];
  contents: Content[];
};

const LivePreview: FC<LivePreviewProps> = ({ sections, contents }) => {
  const groups = sections.map((section) => ({
    section,
    items: contents
      .filter((content) => content.section_id === section.id && !content.is_hidden)
      .sort((a, b) => a.priority - b.priority),
  }));

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 flex-none items-center gap-3 border-b border-gray-200 bg-white px-5">
        <span className="text-sm font-semibold text-gray-900">미리보기</span>
      </div>

      <div className="flex flex-1 justify-center overflow-auto bg-gray-100 p-8">
        <div className="h-max w-full rounded-lg bg-white px-14 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_18px_50px_rgba(0,0,0,0.07)]">
          <Introduce />
          <SocialLinks className="mt-16 py-4" />

          {groups.length > 0 ? (
            <div className="mt-16 space-y-16">
              {groups.map(({ section, items }) => (
                <div key={section.id}>
                  <h2 className="mb-3 text-xl font-bold">{section.name}</h2>

                  {items.length > 0 && (
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
                          <div dangerouslySetInnerHTML={{ __html: item.description }} />
                        </SectionEntry>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-16 text-sm text-gray-400">섹션이 없습니다.</p>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
