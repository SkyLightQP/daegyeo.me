import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectSubtitle, ProjectTitle } from '../../atomics/Typography';

const Edu: React.FC = () => {
  return (
    <ContentBlock title="학력">
      <div>
        <ProjectTitle>
          가천대학교 <ProjectSubtitle>2022~ / 학부생</ProjectSubtitle>
        </ProjectTitle>
        <ProjectBody>AI소프트웨어학부 소프트웨어전공</ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Edu;
