import React from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Stack from '../components/MainContents/Stack';
import Project from '../components/MainContents/Project';
import Prize from '../components/MainContents/Prize';
import LinkSection from '../components/MainContents/Link';
import Edu from '../components/MainContents/Edu';

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
        <Prize />
        <LinkSection />
      </Content>
    </>
  );
};

export default Main;
