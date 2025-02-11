'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useToast } from '@chakra-ui/react';
import { PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import styled from '@emotion/styled';
import Landing from '../components/Landing';
import { Space } from '../components/Space';
import { LargeContentText, LargeHintedText, SectionTitle } from '../components/Typography';
import { SocialLinkView } from '../components/SocialLinkView';
import { ExternalLinkView } from '../components/ContentView/ExternalLinkView';
import { DescriptionView } from '../components/ContentView/DescriptionView';
import { ImageView } from '../components/ContentView/ImageView';
import { getSectionData, SectionType } from '../acitons/section-data.action';
import { PdfView } from '../components/PdfView';

const Container = styled.div`
  margin: 8rem 172px;

  :lang(ko) {
    word-break: keep-all;
  }

  & > div {
    margin-bottom: 64px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 700px) {
    margin: 6rem 36px;
  }
`;

const Page: React.FC = () => {
  const [{ sections, error }, setData] = useState<{ sections: SectionType; error: PostgrestError | null }>({
    sections: [],
    error: null
  });
  const router = useRouter();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });
  const pdfRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: pdfRef });

  useHotkeys('a+d', () => {
    router.push('/admin');
  });

  useEffect(() => {
    getSectionData().then(setData);
  }, []);

  useEffect(() => {
    const printKeyListener = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', printKeyListener);

    return () => {
      window.removeEventListener('keydown', printKeyListener);
    };
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast({
        title: '오류',
        description: '정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요.',
        status: 'error'
      });
    }
  }, [error, toast]);

  return (
    <>
      <Landing />

      <Container>
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
                        {content.images.length > 0 && (
                          <>
                            <Space y={6} />
                            <ImageView
                              images={content.images
                                .sort((a, b) => a.order - b.order)
                                .map((i) => ({
                                  url: i.image_url,
                                  alt: i.alt
                                }))}
                            />
                            <Space y={6} />
                          </>
                        )}
                        <ExternalLinkView links={content.links} />
                        {content.hasMargin && <Space y={26} />}
                      </div>
                    ))}
                </div>
              )
          )}
        <SocialLinkView />
      </Container>

      <PdfView ref={pdfRef} />
    </>
  );
};

export default Page;
