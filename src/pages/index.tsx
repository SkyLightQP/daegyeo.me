import React from 'react';
import styled from '@emotion/styled';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data, error } = await supabaseClient
    .from('sections')
    .select('*, contents(*, links(*))')
    .eq('contents.isHidden', false)
    .order('id', { ascending: true });
  return {
    props: {
      sections: data
    }
  };
};

const Index: React.FC = ({ sections }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  useHotkeys('a+d', () => {
    router.push('/admin');
  });

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
