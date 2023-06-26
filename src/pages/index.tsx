import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useToast } from '@chakra-ui/react';
import Header from '../components/Header';
import MoreLink from '../components/MoreLink';
import Footer from '../components/Footer';
import Colors from '../styles/Colors';
import Content from '../components/Content';
import { supabaseClient } from '../hooks/useSupabase';

const Container = styled.div`
  margin: 3rem 10rem 0;
  color: ${Colors.PRIMARY};

  :lang(ko) {
    word-break: keep-all;
  }

  @media screen and (max-width: 420px) {
    margin: 3rem 2rem 0 2rem;
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
      <Header />

      <Container>
        <Content sections={sections} />
        <MoreLink />
        <Footer />
      </Container>
    </>
  );
};

export default Index;
