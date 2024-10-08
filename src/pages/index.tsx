import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useToast } from '@chakra-ui/react';
import Head from 'next/head';
import Landing from '../components/Landing';
import { supabaseClient } from '../utils/supabase';
import { Space } from '../components/Space';
import { LargeContentText, LargeHintedText, SectionTitle } from '../components/Typography';
import { SchemaType } from '../types/type-util';
import { SocialLinkView } from '../components/SocialLinkView';
import { ExternalLinkView } from '../components/ContentView/ExternalLinkView';
import { DescriptionView } from '../components/ContentView/DescriptionView';
import { ImageView } from '../components/ContentView/ImageView';

type SectionType = Array<
  SchemaType<'sections'> & {
    contents: Array<SchemaType<'contents'> & { links: SchemaType<'links'>[]; images: SchemaType<'images'>[] }>;
  }
>;

interface ServerSideProps {
  readonly sections: SectionType;
  readonly error: unknown;
}

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

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const { data, error } = await supabaseClient
    .from('sections')
    .select('*, contents(*, links(*), images(*))')
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
      <Head>
        <title>하대겸 | Daegyeom Ha</title>
      </Head>

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
                      <div>
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
    </>
  );
};

export default Index;
