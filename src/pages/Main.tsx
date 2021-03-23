import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBlog, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ContentBlock from '../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../atomics/Typography';
import Header from '../components/Header';
import DirectLink from '../components/DirectLink';

const Content = styled.div`
  margin: 3rem 5rem 0 5rem;
  color: #303b4d;

  @media screen and (max-width: 420px) {
    margin: 3rem 2rem 0 2rem;
  }
`;

const LinkStyle = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const Main: React.FC = () => {
  return (
    <>
      <Header />

      <Content>
        <ContentBlock title="기술스택">
          <ProjectTitle>Language</ProjectTitle>
          <ProjectBody>Java, Kotlin, TypeScript, GraphQL</ProjectBody>
          <ProjectTitle>Framework , Library</ProjectTitle>
          <ProjectBody>React, Express.js, Vue</ProjectBody>
          <ProjectTitle>Infra</ProjectTitle>
          <ProjectBody>Docker, AWS, NCP(Ncloud)</ProjectBody>
        </ContentBlock>

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

        <ContentBlock title="수상">
          <ProjectTitle>제3회 장애인식개선콘텐츠공모전 최우수상 (2019)</ProjectTitle>
          <ProjectBody>영상 분야에 참여했습니다.</ProjectBody>
          <br />

          <ProjectTitle>Hello20Thon 장려상 (2020)</ProjectTitle>
          <ProjectBody>할 일을 공유하고 경쟁하는 서비스를 만들었습니다.</ProjectBody>
          <br />

          <ProjectTitle>2020-2 Ajou SOFTCON 고등부문 우수상 (2020)</ProjectTitle>
          <ProjectBody>인스타그램의 프론트엔드와 백엔드를 클론코딩하는 프로젝트를 진행했습니다.</ProjectBody>
        </ContentBlock>

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

        <ContentBlock title="LINK">
          <ProjectTitle>
            <LinkStyle href="mailto:combbm@gmail.com">
              <FontAwesomeIcon icon={faAt} size="sm" /> Email
            </LinkStyle>
          </ProjectTitle>

          <ProjectTitle>
            <LinkStyle
              href="https://github.com/SkyLightQP/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="sm" /> GitHub
            </LinkStyle>
          </ProjectTitle>

          <ProjectTitle>
            <LinkStyle href="https://blog.skylightqp.kr/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faBlog} size="sm" /> Blog
            </LinkStyle>
          </ProjectTitle>

          <ProjectTitle>
            <LinkStyle
              href="https://www.acmicpc.net/user/combbm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faCode} size="sm" /> Baekjoon
            </LinkStyle>
          </ProjectTitle>
        </ContentBlock>
      </Content>
    </>
  );
};

export default Main;
