import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectSubtitle, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Prize: React.FC = () => {
  return (
    <ContentBlock title='수상'>
      <div>
        <ProjectTitle>
          2020-2 Ajou SOFTCON 고등부문 우수상 <ProjectSubtitle>2020 / 백엔드</ProjectSubtitle>
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
          Hello20Thon 장려상 <ProjectSubtitle>2020 / 백엔드</ProjectSubtitle>
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
          제3회 장애인식개선콘텐츠공모전 교육부장관상 <ProjectSubtitle>2019 / 모션그래픽</ProjectSubtitle>
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
