import React from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Stack from './contents/Stack';
import Project from './contents/Project';
import Prize from './contents/Prize';
import LinkSection from './contents/Link';
import Edu from './contents/Edu';
import Activity from './contents/Activity';
import Footer from '../components/Footer';

const Content = styled.div`
  margin: 3rem 5rem 0 5rem;
  color: #303b4d;

  :lang(ko) {
    word-break: keep-all;
  }

  @media screen and (max-width: 420px) {
    margin: 3rem 2rem 0 2rem;
  }
`;

const Main: React.FC = () => {
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

export default Main;
