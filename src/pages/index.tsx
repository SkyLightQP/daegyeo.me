import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useToast } from '@chakra-ui/react';
import { RiPagesLine } from '@remixicon/react';
import Landing from '../components/Landing';
import { supabaseClient } from '../utils/supabase';
import { Space } from '../components/Space';
import { ExternalLink } from '../components/Link/ExternalLink';
import { ContentListItem, LargeContentText, LargeHintedText, SectionTitle } from '../components/Typography';
import { SocialLink } from '../components/Link/SocialLink';
import Breakpoint from '../styles/Breakpoint';

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

const ContentList = styled.div`
  & > div {
    margin-bottom: 28px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const ExternalLinkGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > a {
    margin-right: 6px;
  }

  & > a:last-child {
    margin-right: 0;
  }
`;

const ImageGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > img {
    margin-right: 16px;
  }

  & > img:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    overflow-x: auto;
  }
`;

const StyledImage = styled.img`
  width: auto;
  height: 80px;
  border-radius: 10px;
`;

const SocialLinkGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max(10vmin, 100px));
  grid-row-gap: 4px;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    grid-column-gap: 6px;
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabaseClient
    .from('sections')
    .select('*, contents(*, links(*))')
    .eq('contents.isHidden', false)
    .order('id', { ascending: true });
  return {
    props: {
      sections: data,
      error
    }
  };
};

const Index: React.FC = ({ sections, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <div>
          <SectionTitle>이러한 기술을 활용합니다. — 기술스택</SectionTitle>
          <Space y={6} />
          <LargeContentText>- TypeScript, Kotlin, Java</LargeContentText>
          <LargeContentText>- TypeScript, Kotlin, Java</LargeContentText>
          <LargeContentText>- TypeScript, Kotlin, Java</LargeContentText>
        </div>
        <div>
          <SectionTitle>이러한 곳에서 함께 했습니다. — 경력</SectionTitle>
          <Space y={6} />
          <ContentList>
            <div>
              <LargeContentText>
                개발자 <LargeHintedText>(개발팀, 2024.01. ~ 2024.04.)</LargeHintedText>
              </LargeContentText>
              <ContentListItem>
                이곳에는 리스트 형태의 내용이 들어갑니다. 마크다운에서는 * 또는 -으로 표현할 수 있습니다.
              </ContentListItem>
              <Space y={6} />
              <ImageGroup>
                <StyledImage src="https://via.placeholder.com/1920x1080" alt="이미지" />
                <StyledImage src="https://via.placeholder.com/1920x1080" alt="이미지" />
                <StyledImage src="https://via.placeholder.com/1920" alt="이미지" />
                <StyledImage src="https://via.placeholder.com/1920" alt="이미지" />
                <StyledImage src="https://via.placeholder.com/1920" alt="이미지" />
              </ImageGroup>
              <Space y={6} />
              <ExternalLinkGroup>
                <ExternalLink href="#">블로그</ExternalLink>
                <ExternalLink href="#">홈페이지</ExternalLink>
              </ExternalLinkGroup>
            </div>
          </ContentList>
        </div>
        <div>
          <SectionTitle>더 궁금하시다면,</SectionTitle>
          <Space y={6} />
          <LargeContentText>
            <SocialLinkGroup>
              <SocialLink href="#" icon={RiPagesLine}>
                블로그
              </SocialLink>
              <SocialLink href="#" icon={RiPagesLine}>
                블로그
              </SocialLink>
              <SocialLink href="#" icon={RiPagesLine}>
                블로그
              </SocialLink>
              <SocialLink href="#" icon={RiPagesLine}>
                블로그
              </SocialLink>
            </SocialLinkGroup>
          </LargeContentText>
        </div>
      </Container>
    </>
  );
};

export default Index;
