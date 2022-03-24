import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';
import HorizontalGap from '../HorizontalGap';

const Project: React.FC = () => {
  return (
    <ContentBlock title="프로젝트">
      <div>
        <ProjectTitle>
          수정과 <ProjectDate>(2020~2021)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          학과 인트라넷 서비스 <br />
          온라인으로 수강 신청을 하고 시간표, 급식을 확인할 수 있습니다. <br />
          with <b>TypeScript, React, Expressjs, Swagger, FCM</b> <br />
          <DirectLink href="https://github.com/swjb-sinamon">GitHub</DirectLink>
          <HorizontalGap gap={8} />
          <DirectLink href="https://snm.itsw.info">Link</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          커넥트클래스 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          SW마에스트로 11기 온라인 스터디 플랫폼 <br />
          음성 통화, 자료 공유 및 편집, 자료 필기가 가능합니다. <br />
          with <b>TypeScript, React, WebRTC, WebSocket, AWS</b> <br />
          <DirectLink href="https://github.com/real-compacted-developer/connect-class">
            GitHub
          </DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          ZUDA <ProjectDate>(2021)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          학습 보조 플랫폼 <br />
          과제제출, 출석체크, 화면공유 기능을 제공합니다. <br />
          with <b>TypeScript, Nestjs, WebRTC, WebSocket, MariaDB, MongoDB</b>
          <br />
          <DirectLink href="https://github.com/zzuda">GitHub</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          수프트 <ProjectDate>(2019~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          커뮤니티형 문제은행 서비스 <br />
          누구나 문제를 내고 다른 사람의 문제를 풀 수 있습니다. <br />
          with <b>TypeScript, Expressjs, React, GraphQL</b>
          <br />
          <DirectLink href="https://github.com/swsuft">GitHub</DirectLink>
          <HorizontalGap gap={8} />
          <DirectLink href="https://suft.kr">Link</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          끄투닷컴 <ProjectDate>(2017~2021)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          끝말잇기, 타자게임 등 글자를 이용한 웹 게임
          <br />
          with <b>JavaScript, PostgreSQL, Redis, WebSocket</b> <br />
          <DirectLink href="https://github.com/SkyLightQP/KKuTuDotCom">GitHub</DirectLink>
        </ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Project;
