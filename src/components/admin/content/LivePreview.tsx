'use client';

import { FC } from 'react';
import { Introduce } from '@/components/blocks/Introduce';
import SocialLinks from '@/components/blocks/SocialLinks';
import SectionBlocks from '@/components/SectionBlocks';
import Footer from '@/components/Footer';
import { Content } from '@/components/admin/content/ContentCard';
import { SectionType } from '@/components/admin/section/AddSectionDialog';

export type PreviewSection = { id: number; name: string; type: SectionType };

type LivePreviewProps = {
  sections: PreviewSection[];
  contents: Content[];
};

const LivePreview: FC<LivePreviewProps> = ({ sections, contents }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 flex-none items-center gap-3 border-b border-gray-200 bg-white px-5">
        <span className="text-sm font-semibold text-gray-900">미리보기</span>
      </div>

      <div className="flex flex-1 justify-center overflow-auto bg-gray-100 p-8">
        <div className="h-max w-full rounded-lg bg-white px-14 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_18px_50px_rgba(0,0,0,0.07)]">
          <Introduce />
          <SocialLinks className="mt-16 py-4" />

          {sections.length > 0 ? (
            <SectionBlocks sections={sections} contents={contents} className="mt-16" />
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
