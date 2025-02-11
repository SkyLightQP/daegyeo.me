'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getSectionData, SectionType } from '../../acitons/section-data.action';

import { LargeContentText, LargeHintedText, SectionTitle } from '../Typography';
import { Space } from '../Space';
import { DescriptionView } from '../ContentView/DescriptionView';
import { ExternalLinkView } from '../ContentView/ExternalLinkView';

const PdfWrapper = styled.div`
  display: none;
  @media print {
    display: block;
  }
`;

const PdfContainer = styled.div`
  margin: 4rem 10px;

  :lang(ko) {
    word-break: keep-all;
  }

  & > div {
    margin-bottom: 64px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

export const PdfView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((_, ref) => {
  const [{ sections }, setData] = useState<{ sections: SectionType }>({
    sections: []
  });

  useEffect(() => {
    getSectionData().then(setData);
  }, []);

  return (
    <PdfWrapper>
      <PdfContainer ref={ref}>
        {sections
          .sort((a, b) => a.order - b.order)
          .map(
            (section) =>
              section.contents.length > 0 && (
                <div key={section.id}>
                  <SectionTitle>{section.title}</SectionTitle>
                  <Space y={6} />
                  {section.contents
                    .sort((a, b) => a.order - b.order)
                    .map((content) => (
                      <div key={content.id}>
                        <LargeContentText>
                          {content.title} <LargeHintedText>{content.subtitle}</LargeHintedText>
                        </LargeContentText>
                        <DescriptionView description={content.description} />
                        <ExternalLinkView links={content.links} />
                        {content.hasMargin && <Space y={26} />}
                      </div>
                    ))}
                </div>
              )
          )}
      </PdfContainer>
    </PdfWrapper>
  );
});
