import React from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Stack from '../components/Contents/Stack';
import Project from '../components/Contents/Project';
import Prize from '../components/Contents/Prize';
import LinkSection from '../components/Contents/Link';
import Edu from '../components/Contents/Edu';
import Activity from '../components/Contents/Activity';
import Footer from '../components/Footer';
import Colors from '../styles/Colors';

const Content = styled.div`
  margin: 3rem 5rem 0 5rem;
  color: ${Colors.PRIMARY};

  :lang(ko) {
    word-break: keep-all;
  }

  @media screen and (max-width: 420px) {
    margin: 3rem 2rem 0 2rem;
  }
`;

const Index: React.FC = () => {
  return (
    <>
      <Header />

      <Content>
        <Stack />
        <Edu />
        <Project />
        <Activity />
        <Prize />
        <LinkSection />
        <Footer />
      </Content>
    </>
  );
};

export default Index;