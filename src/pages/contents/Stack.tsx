import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';

const Stack: React.FC = () => {
  return (
    <ContentBlock title="기술스택">
      <ProjectTitle>Language</ProjectTitle>
      <ProjectBody>Java, Kotlin, TypeScript</ProjectBody>

      <ProjectTitle>Framework, Library</ProjectTitle>
      <ProjectBody>React, Expressjs, Nestjs</ProjectBody>

      <ProjectTitle>DevOps and Infrastructure</ProjectTitle>
      <ProjectBody>Linux, Docker, MySQL, PostgreSQL</ProjectBody>
    </ContentBlock>
  );
};

export default Stack;
