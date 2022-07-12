import React from 'react';
import ContentBlock from '../ContentBlock';
import { Body, Subtitle, Title } from '../Typography';
import DirectLink from '../DirectLink';

const Activity: React.FC = () => {
  return (
    <ContentBlock title="활동">
      <div>
        <Title>
          SW마에스트로 11기 수료생 <Subtitle>2020</Subtitle>
        </Title>
        <Body>
          소프트웨어마에스트로 과정에 참가했습니다. <br />
          린 캔버스를 이용해 비즈니스 모델을 구축하고 '커넥트클래스' 프로젝트를 진행했습니다. <br />
        </Body>
      </div>

      <div>
        <Title>
          TeamIF <Subtitle>2019~ / 프론트엔드</Subtitle>
        </Title>
        <Body>
          청소년 프로그래밍 팀, TeamIF 개발자 <br />
          팀, 팀원 소개를 위한 사이트 제작 및 사이트 리메이크를 담당하고 있습니다. <br />
          with <b>TypeScript, React</b>
          <br />
          <DirectLink href="https://teamif.io">Page</DirectLink>
        </Body>
      </div>
    </ContentBlock>
  );
};

export default Activity;
