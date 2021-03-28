import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Project: React.FC = () => {
  return (
    <ContentBlock title="프로젝트">
      <ProjectTitle>끄투닷컴 (2017~)</ProjectTitle>
      <ProjectBody>
        끄투닷컴은 온라인 웹 환경의 끝말잇기 게임입니다. <br />
        <b>JavaScript, Pug</b>를 사용했습니다. <br />
        <DirectLink href="https://kkutu.club">서비스 바로가기</DirectLink>
      </ProjectBody>
      <br />

      <ProjectTitle>AskQ (2018~)</ProjectTitle>
      <ProjectBody>
        익명 질문 서비스입니다. <br />
        <b>Vue, Firebase</b>를 사용했습니다. <br />
      </ProjectBody>
      <br />

      <ProjectTitle>Kronos (2019~)</ProjectTitle>
      <ProjectBody>
        교내 시간표 및 급식을 확인할 수 있는 디스코드 봇입니다. <br />
        <b>Kotlin, Discord JDA</b>를 사용했습니다.
      </ProjectBody>
      <br />

      <ProjectTitle>수프트 (2019~)</ProjectTitle>
      <ProjectBody>
        커뮤니티형 문제은행 플랫폼입니다. <br />
        교내 학생 누구나 문제를 내고 풀 수 있습니다. <br />
        <b>TypeScript, React, GraphQL</b>을 사용했습니다. <br />
        <DirectLink href="https://github.com/swsuft">GitHub 바로가기</DirectLink>
      </ProjectBody>
      <br />

      <ProjectTitle>수정과 (2020~2021)</ProjectTitle>
      <ProjectBody>
        교내 인트라넷 서비스 개발팀으로 참여했습니다. <br />
        시간표 확인, 방과 후 신청 등 교내 사업을 온라인으로 진행할 수 있습니다. <br />
        <b>TypeScript, React, Express</b>를 사용했습니다.
        <br />
        <DirectLink href="https://github.com/swjb-sinamon">GitHub 바로가기</DirectLink>
      </ProjectBody>
      <br />

      <ProjectTitle>커넥트클래스</ProjectTitle>
      <ProjectBody>
        SW마에스트로에서 진행한 온라인 스터디 플랫폼입니다. <br />
        음성 통화, 자료 공유 및 편집, 자료 필기가 가능합니다. <br />
        <b>TypeScript, React, AWS</b>를 사용하고 <b>WebRTC, Canvas</b> 기술을 사용했습니다.
      </ProjectBody>
    </ContentBlock>
  );
};

export default Project;
