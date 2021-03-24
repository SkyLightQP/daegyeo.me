import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';

const Stack: React.FC = () => {
  return (
    <ContentBlock title="기술스택">
      <ProjectTitle>Language</ProjectTitle>
      <ProjectBody>Java, Kotlin, TypeScript, GraphQL</ProjectBody>

      <ProjectTitle>Framework , Library</ProjectTitle>
      <ProjectBody>React, Express.js, Vue2</ProjectBody>

      <ProjectTitle>Infra</ProjectTitle>
      <ProjectBody>Docker, AWS, NCP(Naver Cloud Platform)</ProjectBody>
    </ContentBlock>
  );
};

export default Stack;
