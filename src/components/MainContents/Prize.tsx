import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import { ProjectBody, ProjectTitle } from '../../atomics/Typography';
import DirectLink from '../../components/DirectLink';

const Prize: React.FC = () => {
  return (
    <ContentBlock title="수상">
      <ProjectTitle>제3회 장애인식개선콘텐츠공모전 최우수상 (2019)</ProjectTitle>
      <ProjectBody>영상 분야에 참여했습니다.</ProjectBody>
      <br />

      <ProjectTitle>Hello20Thon 장려상 (2020)</ProjectTitle>
      <ProjectBody>
        서로의 목표를 공유하면서 흥미를 주는 프로젝트인 Seed를 만들었습니다.
      </ProjectBody>
      <br />

      <ProjectTitle>2020-2 Ajou SOFTCON 고등부문 우수상 (2020)</ProjectTitle>
      <ProjectBody>
        인스타그램의 프론트엔드와 백엔드를 클론코딩하는 프로젝트를 진행했습니다.
        <br />
        <DirectLink href="https://github.com/Sustagram">GitHub 바로가기</DirectLink>
      </ProjectBody>
    </ContentBlock>
  );
};

export default Prize;
