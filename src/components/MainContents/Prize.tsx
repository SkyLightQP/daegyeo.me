import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectDate, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Prize: React.FC = () => {
  return (
    <ContentBlock title='수상 및 활동'>
      <div>
        <ProjectTitle>
          SW마에스트로 11기 수료생 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          소프트웨어마에스트로 과정에 참가했습니다. <br />
          린 캔버스를 이용해 비즈니스 모델을 구축하고 '커넥트클래스' 프로젝트를 진행했습니다. <br />
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          2020-2 Ajou SOFTCON 고등부문 우수상 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          Python과 Django를 활용해보기 위해 진행했습니다. <br />
          Amazon S3를 이용하여 사진 리소스를 관리했습니다. <br />
          with <b>Python, Django, MariaDB, Amazon S3</b> <br />
          <DirectLink href='https://github.com/Sustagram'>GitHub</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          Hello20Thon 장려상 <ProjectDate>(2020)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          서로의 목표를 공유하면서 이루는 프로젝트, Seed <br />
          GitHub의 Fork를 모방하여 서로 목표를 공유할 수 있습니다. <br />
          트리형태로 데이터를 관리하기 위해 MongoDB를 선택했습니다. <br />
          with <b>TypeScript, Expressjs, MongoDB</b>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          TeamIF <ProjectDate>(2019~)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          청소년 프로그래밍 팀, TeamIF 개발자 <br />
          팀, 팀원 소개를 위한 사이트 제작 및 사이트 리메이크를 담당하고 있습니다. <br/>
          with <b>TypeScript, React</b>
          <br />
          <DirectLink href='https://teamif.io'>Page</DirectLink>
        </ProjectBody>
      </div>

      <div>
        <ProjectTitle>
          제3회 장애인식개선콘텐츠공모전 교육부장관상 <ProjectDate>(2019)</ProjectDate>
        </ProjectTitle>
        <ProjectBody>
          장애인과 비장애인이 함께하자는 주제를 가지고 참여한 공모전입니다. <br />
          영상 분야 참여, 모션 그래픽 제작을 담당했습니다. <br />
          with <b>Adobe After Effects</b>
        </ProjectBody>
      </div>
    </ContentBlock>
  );
};

export default Prize;
