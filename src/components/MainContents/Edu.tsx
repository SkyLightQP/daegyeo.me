import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';

const Edu: React.FC = () => {
  return (
    <ContentBlock title="학력">
      <div>
        <ProjectTitle>
          가천대학교 <ProjectDate>(2022~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>AI소프트웨어학부</ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Edu;
