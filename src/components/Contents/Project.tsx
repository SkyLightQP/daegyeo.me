import React from 'react';
import ContentBlock from '../ContentBlock';
import { Body, Subtitle, Title } from '../Typography';
import DirectLink from '../DirectLink';
import HorizontalGap from '../HorizontalGap';

const Project: React.FC = () => {
  return (
    <ContentBlock title="프로젝트">
      <div>
        <Title>
          수정과 <Subtitle>2020~2021 / 프론트엔드, 백엔드</Subtitle>
        </Title>
        <Body>
          고교학점제 수강신청, 우산 대여, 시간표 확인 등이 가능한 인트라넷 프로젝트입니다. <br />
          팀장 및 프론트엔드, 백엔드 개발을 담당했습니다. <br />
          with <b>TypeScript, React, Expressjs, Swagger, FCM</b> <br />
          <DirectLink href="https://github.com/swjb-sinamon">GitHub</DirectLink>
          <HorizontalGap gap={8} />
          <DirectLink href="https://snm.itsw.info">Page</DirectLink>
        </Body>
      </div>

      <div>
        <Title>
          커넥트클래스 <Subtitle>2020 / 프론트엔드, 백엔드</Subtitle>
        </Title>
        <Body>
          SW마에스트로 11기에서 진행한 온라인 스터디 플랫폼입니다. <br />
          음성 통화, 자료 공유 및 편집, 자료 필기가 가능합니다. <br />
          WebSocket과 Canvas를 이용하여 실시간으로 자료를 필기하고 저장하는 기능을 구현했습니다. <br />
          with <b>TypeScript, React, WebRTC, WebSocket, AWS</b> <br />
          <DirectLink href="https://github.com/real-compacted-developer/connect-class">GitHub</DirectLink>
        </Body>
      </div>

      <div>
        <Title>
          ZUDA <Subtitle>2020 / 백엔드</Subtitle>
        </Title>
        <Body>
          과제제출, 출석체크, 화면공유를 제공하는 학습 보조 플랫폼입니다.
          <br />
          한글 출석체크 단어 조합과 WebRTC를 이용한 화면공유를 구현했습니다. <br />
          단어 데이터와 방 관리를 위해 두 개의 데이터베이스를 이용했습니다. <br />
          with <b>TypeScript, Nestjs, WebRTC, WebSocket, MariaDB, MongoDB</b>
          <br />
          <DirectLink href="https://github.com/zzuda">GitHub</DirectLink>
          <HorizontalGap gap={8} />
          <DirectLink href="https://blog.skylightqp.kr/290">Article</DirectLink>
        </Body>
      </div>

      <div>
        <Title>
          수프트 <Subtitle>2019~ / 프론트엔드, 백엔드</Subtitle>
        </Title>
        <Body>
          학교 시험공부를 위해 제작한 문제은행 서비스입니다. <br />
          GraphQL을 이용하여 백엔드 API를 구현했습니다. <br />
          with <b>TypeScript, Expressjs, React, GraphQL</b>
          <br />
          <DirectLink href="https://github.com/swsuft">GitHub</DirectLink>
          <HorizontalGap gap={8} />
          <DirectLink href="https://suft.kr">Page</DirectLink>
        </Body>
      </div>

      <div>
        <Title>
          끄투닷컴 <Subtitle>2017~2021 / 프론트엔드, 백엔드</Subtitle>
        </Title>
        <Body>
          끝말잇기, 타자게임 등 글자를 이용한 웹 게임
          <br />
          with <b>JavaScript, PostgreSQL, Redis, WebSocket</b> <br />
          <DirectLink href="https://github.com/SkyLightQP/KKuTuDotCom">GitHub</DirectLink>
        </Body>
      </div>
    </ContentBlock>
  );
};

export default Project;
