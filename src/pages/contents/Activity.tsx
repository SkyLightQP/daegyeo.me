import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectSubtitle, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Activity: React.FC = () => {
  return (
    <ContentBlock title='활동'>
      <div>
        <ProjectTitle>
          SW마에스트로 11기 수료생 <ProjectSubtitle>2020</ProjectSubtitle>
        </ProjectTitle>
        <ProjectBody>
          소프트웨어마에스트로 과정에 참가했습니다. <br />
          린 캔버스를 이용해 비즈니스 모델을 구축하고 '커넥트클래스' 프로젝트를 진행했습니다. <br />
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          TeamIF <ProjectSubtitle>2019~ / 프론트엔드</ProjectSubtitle>
        </ProjectTitle>
        <ProjectBody>
          청소년 프로그래밍 팀, TeamIF 개발자 <br />
          팀, 팀원 소개를 위한 사이트 제작 및 사이트 리메이크를 담당하고 있습니다. <br />
          with <b>TypeScript, React</b>
          <br />
          <DirectLink href='https://teamif.io'>Page</DirectLink>
        </ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Activity;
