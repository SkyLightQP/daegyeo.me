import React from 'react';
import ContentBlock from '../ContentBlock';
import { Body, Subtitle, Title } from '../Typography';

const Edu: React.FC = () => {
  return (
    <ContentBlock title='학력'>
      <div>
        <Title>
          가천대학교 <Subtitle>2022~ / 학부생</Subtitle>
        </Title>
        <Body>AI&middot;소프트웨어학부 소프트웨어전공</Body>
      </div>
    </ContentBlock>
  );
};

export default Edu;
