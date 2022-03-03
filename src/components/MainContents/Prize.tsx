import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Prize: React.FC = () => {
  return (
    <ContentBlock title="수상 및 활동">
      <div>
        <ProjectTitle>
          SW마에스트로 11기 수료생 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>소프트웨어 마에스트로 11기 수료생</ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          2020-2 Ajou SOFTCON 고등부문 우수상 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          인스타그램의 프론트엔드와 백엔드를 클론코딩하는 프로젝트 <br />
          with <b>Python, Django, MariaDB, Amazon S3</b> <br />
          <DirectLink href="https://github.com/Sustagram">GitHub</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          Hello20Thon 장려상 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          서로의 목표를 공유하면서 실현하는 프로젝트, Seed <br />
          with <b>TypeScript, Expressjs, MongoDB</b>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          TeamIF <ProjectDate>(2019~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          청소년 프로그래밍 팀, TeamIF 개발자 <br />
          팀사이트 개발 및 리메이크를 담당했습니다. <br />
          with <b>TypeScript, React</b>
          <br />
          <DirectLink href="https://teamif.io">팀 홈페이지</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          제3회 장애인식개선콘텐츠공모전 최우수상 <ProjectDate>(2019)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          영상 분야, 모션 그래픽 제작 담당 <br />
          with <b>Adobe After Effects</b>
        </ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Prize;
