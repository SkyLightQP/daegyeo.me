'use client';

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getPdfSectionData, SectionType } from '../../acitons/section-data.action';
import { LargeContentText, LargeHintedText, SectionTitle } from '../Typography';
import { Space } from '../Space';
import { DescriptionView } from '../ContentView/DescriptionView';
import { ExternalLinkView } from '../ContentView/ExternalLinkView';
import Colors from '../../styles/Colors';

const PdfWrapper = styled.div`
  display: none;

  @media print {
    display: block;
  }

  @page {
    size: A4;
    margin: 1.8cm 0;
  }
`;

const PdfContainer = styled.div`
  background-color: white;
  padding: 0 4rem;

  :lang(ko) {
    word-break: keep-all;
  }

  & > section {
    margin-bottom: 64px;
  }

  & > section:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  color: ${Colors.PRIMARY};
  font-weight: 500;
  font-size: 28px;
  line-height: 1.32;
`;

const HighlightedTitle = styled.span`
  font-weight: 700;
`;

const HintedTitle = styled.span`
  color: ${Colors.PRIMARY};
  font-size: 24px;
`;

const IntroduceText = styled.p`
  margin-top: 18px;
  margin-bottom: 30px;

  color: ${Colors.PRIMARY};
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;
`;

const ContactTitle = styled.span`
  display: inline-block;
  width: 80px;
  text-align: center;
  margin-right: 10px;
`;

const Divider = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: ${Colors.GRAY};
  margin: 3rem 0 2.7rem 0;
`;

export const PdfView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((_, ref) => {
  const [{ sections }, setData] = useState<{ sections: SectionType }>({
    sections: []
  });

  useEffect(() => {
    getPdfSectionData().then(setData);
  }, []);

  useEffect(() => {
    setInterval(() => {
      const details = document.querySelectorAll('details');
      details.forEach((detail) => {
        detail.setAttribute('open', '');
      });
    }, 400);
  }, []);

  return (
    <PdfWrapper>
      <PdfContainer ref={ref}>
        <Title>
          우리 생활을 더 편리하게 만듭니다
          <br />
          개발자 <HighlightedTitle>하대겸</HighlightedTitle> <HintedTitle>(Daegyeom Ha)</HintedTitle>
        </Title>

        <IntroduceText>
          우리 주변의 문제를 글이 아닌 기술로 표현합니다.
          <br />
          문제를 기술로 해결하기 위해 노력하고 있습니다.
        </IntroduceText>

        <div>
          <p>
            <ContactTitle>Email</ContactTitle>
            <a href="mailto:combbm@gmail.com">combbm@gmail.com</a>
          </p>
          <p>
            <ContactTitle>Github</ContactTitle>
            <a href="https://github.com/SkyLightQP">https://github.com/SkyLightQP</a>
          </p>
          <p>
            <ContactTitle>Blog</ContactTitle>
            <a href="https://blog.skylightqp.kr">https://blog.skylightqp.kr</a>
          </p>
          <p>
            <ContactTitle>LinkedIn</ContactTitle>
            <a href="https://linkedin.com/in/daegyeom">https://linkedin.com/in/daegyeom</a>
          </p>
        </div>

        <Divider />

        {sections
          .sort((a, b) => a.order - b.order)
          .map(
            (section) =>
              section.contents.length > 0 && (
                <section key={section.id}>
                  <SectionTitle>{section.title}</SectionTitle>
                  <Space y={6} />
                  {section.contents
                    .sort((a, b) => a.order - b.order)
                    .map((content) => (
                      <div key={content.id} style={{ breakInside: 'avoid' }}>
                        <LargeContentText>
                          {content.title} <LargeHintedText>{content.subtitle}</LargeHintedText>
                        </LargeContentText>
                        <DescriptionView description={content.description} />
                        <ExternalLinkView links={content.links} isPrint />
                        {content.hasMargin && <Space y={26} />}
                      </div>
                    ))}
                </section>
              )
          )}

        <p style={{ fontSize: '14px', marginTop: '6rem' }}>
          이 이력서 원본은 <a href="https://daegyeo.me">daegyeo.me</a>에서 확인하실 수 있습니다.
        </p>
      </PdfContainer>
    </PdfWrapper>
  );
});
