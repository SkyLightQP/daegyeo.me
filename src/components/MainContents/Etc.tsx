import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Etc: React.FC = () => {
  return (
    <ContentBlock title="그 밖에">
      <ProjectTitle>
        SW마에스트로 11기 수료생 <ProjectDate>(2020)</ProjectDate>
      </ProjectTitle>
      <ProjectBody>소프트웨어 마에스트로 11기 수료생입니다.</ProjectBody>
      <br />

      <ProjectTitle>
        TeamIF <ProjectDate>(2019~)</ProjectDate>
      </ProjectTitle>
      <ProjectBody>
        청소년 프로그래밍 팀, TeamIF 소속 개발자입니다. <br />
        팀사이트 개발 및 리메이크, 팀 인트라넷 개발을 담당하였습니다. <br />
        <DirectLink href="https://teamif.io">팀 홈페이지 바로가기</DirectLink>
      </ProjectBody>
    </ContentBlock>
  );
};

export default Etc;
