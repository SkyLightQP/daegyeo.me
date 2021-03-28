import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Etc: React.FC = () => {
  return (
    <ContentBlock title="그 밖에">
      <ProjectTitle>SW마에스트로 11기 수료생</ProjectTitle>
      <ProjectBody>소프트웨어 마에스트로 11기 수료생입니다.</ProjectBody>
      <br />

      <ProjectTitle>TeamIF</ProjectTitle>
      <ProjectBody>
        청소년 프로그래밍 팀, TeamIF 소속 개발자입니다. <br />
        <DirectLink href="https://teamif.io">팀 홈페이지 바로가기</DirectLink>
      </ProjectBody>
    </ContentBlock>
  );
};

export default Etc;
