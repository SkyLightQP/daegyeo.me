import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';

const Stack: React.FC = () => {
  return (
    <ContentBlock title="기술스택">
      <ProjectTitle>Language</ProjectTitle>
      <ProjectBody>Java, Kotlin, TypeScript, GraphQL</ProjectBody>

      <ProjectTitle>Framework, Library</ProjectTitle>
      <ProjectBody>React, Express.js, Nestjs</ProjectBody>

      <ProjectTitle>DevOps</ProjectTitle>
      <ProjectBody>Ubuntu, Docker, AWS, NCP</ProjectBody>
    </ContentBlock>
  );
};

export default Stack;
