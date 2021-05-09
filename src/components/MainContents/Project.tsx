import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Project: React.FC = () => {
  return (
    <ContentBlock title="프로젝트">
      <div>
        <ProjectTitle>
          끄투닷컴 <ProjectDate>(2017~2021)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          끄투닷컴은 온라인 웹 환경의 끝말잇기 게임입니다. <br />
          <b>JavaScript, Pug</b>를 사용했습니다. <br />
          <DirectLink href="https://github.com/SkyLightQP/KKuTuDotCom">GitHub</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          AskQ <ProjectDate>(2018~2021)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          Firebase Firestore을 이용한 익명 질문 서비스입니다. <br />
          <b>Vue, Firebase</b>를 사용했습니다.
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          Kronos <ProjectDate>(2019~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          교내 시간표 및 급식을 확인할 수 있는 디스코드 봇입니다. <br />
          <b>Selenium</b>을 이용해서 시간표를 가져옵니다. <br />
          <b>Kotlin, Discord JDA</b>를 사용했습니다.
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          수프트 <ProjectDate>(2019~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          커뮤니티형 문제은행 플랫폼입니다. <br />
          누구나 문제를 낼 수 있고 특정 과목의 문제를 랜덤으로 풀 수 있습니다. <br />
          <b>TypeScript, React, GraphQL</b>을 사용했습니다. <br />
          <DirectLink href="https://github.com/swsuft">GitHub</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          커넥트클래스 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          SW마에스트로에서 진행한 온라인 스터디 플랫폼입니다. <br />
          음성 통화, 자료 공유 및 편집, 자료 필기가 가능합니다. <br />
          <b>Amazon S3, Cloudfront</b>를 이용하여 프론트엔드를 배포하고 캐싱하였습니다. <br />
          <b>TypeScript, React, AWS</b>를 사용하고 <b>WebRTC, Canvas</b> 기술을 사용했습니다.
          <br />
          <DirectLink href="https://github.com/real-compacted-developer/connect-class">
            GitHub
          </DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          수정과 <ProjectDate>(2020~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          교내(학과) 인트라넷 서비스 운영, 개발 담당으로 참여했습니다. <br />
          시간표 확인, 교내 행사 등 온라인으로 확인하고 참여할 수 있습니다. <br />
          Swagger를 이용하여 API 문서화를 하였습니다. <br />
          <b>TypeScript, React, Express, FCM(Web Push)</b>을 사용했습니다.
          <br />
          <DirectLink href="https://github.com/swjb-sinamon">GitHub</DirectLink>
        </ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Project;
