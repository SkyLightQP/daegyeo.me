import React, { Fragment, useEffect } from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useToast } from '@chakra-ui/react';
import Landing from '../components/Landing';
import { supabaseClient } from '../utils/supabase';
import { Space } from '../components/Space';
import { LargeContentText, LargeHintedText, SectionTitle } from '../components/Typography';
import { SchemaType } from '../types/type-util';
import { SocialLinkView } from '../components/SocialLinkView';
import { ExternalLinkView } from '../components/ContentView/ExternalLinkView';
import { DescriptionView } from '../components/ContentView/DescriptionView';

type SectionType = Array<
  SchemaType<'sections'> & {
    contents: Array<SchemaType<'contents'> & { links: SchemaType<'links'>[] }>;
  }
>;

interface ServerSideProps {
  readonly sections: SectionType;
  readonly error: unknown;
}

const Container = styled.div`
  margin: 10rem 172px;

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

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const { data, error } = await supabaseClient
    .from('sections')
    .select('*, contents(*, links(*))')
    .eq('contents.isHidden', false)
    .order('id', { ascending: true });
  return {
    props: {
      sections: data as SectionType,
      error
    }
  };
};

const Index: React.FC<ServerSideProps> = ({
  sections,
  error
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  useHotkeys('a+d', () => {
    router.push('/admin');
  });

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
        {(sections as SectionType)
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
                      <div>
                        <LargeContentText>
                          {content.title} <LargeHintedText>{content.subtitle}</LargeHintedText>
                        </LargeContentText>
                        <DescriptionView description={content.description} />
                        {/* <Space y={6} /> */}
                        {/* <ImageView urls={[]} /> */}
                        {content.links.length > 0 && <Space y={6} />}
                        <ExternalLinkView links={content.links} />
                        {content.hasMargin && <Space y={26} />}
                      </div>
                    ))}
                </div>
              )
          )}
        <SocialLinkView />
      </Container>
    </>
  );
};

export default Index;
