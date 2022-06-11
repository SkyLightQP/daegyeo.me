import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { Body, Title } from '../../atomics/Typography';

const Stack: React.FC = () => {
  return (
    <ContentBlock title="기술스택">
      <Title>Language</Title>
      <Body>Java, Kotlin, TypeScript</Body>

      <Title>Framework, Library</Title>
      <Body>React, Expressjs, Nestjs</Body>

      <Title>DevOps and Infrastructure</Title>
      <Body>Linux, Docker, MySQL, PostgreSQL</Body>
    </ContentBlock>
  );
};

export default Stack;
