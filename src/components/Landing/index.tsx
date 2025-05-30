'use client';

import React from 'react';
import styled from '@emotion/styled';
import { RiArrowDropDownLine, RiArticleLine, RiGithubFill, RiMailLine } from '@remixicon/react';
import Colors from '../../styles/Colors';
import { IconLink } from '../Link/IconLink';
import Breakpoint from '../../styles/Breakpoint';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100vh;
  background-color: ${Colors.PRIMARY};
`;

const MarginContainer = styled.div`
  margin: 0 172px;

  @media screen and (max-width: 700px) {
    margin: 0 36px;
  }
`;

const Title = styled.h1`
  color: white;
  font-weight: 500;
  font-size: 32px;
  line-height: 1.32;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 24px;
    word-break: keep-all;
  }
`;

const HighlightedTitle = styled.span`
  font-weight: 700;
`;

const HintedTitle = styled.span`
  color: ${Colors.GRAY};
  font-size: 24px;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 16px;
  }
`;

const IntroduceText = styled.p`
  margin-top: 40px;
  margin-bottom: 40px;

  color: ${Colors.GRAY};
  font-size: 20px;
  font-weight: 400;
  line-height: 1.3;

  word-break: keep-all;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    font-size: 16px;
  }
`;

const IconList = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 24px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const ScrollDownText = styled.p`
  margin-top: 412px;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-weight: 400;
  color: ${Colors.GRAY};

  & svg {
    margin-left: 2px;
  }

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    margin-top: 330px;
    font-size: 14px;
    justify-content: center;
  }
`;

const Landing: React.FC = () => {
  return (
    <Container>
      <MarginContainer>
        <div>
          <Title>
            문제를 기술로 해결할 수 있는 방법을 찾습니다
            <br />
            개발자 <HighlightedTitle>하대겸</HighlightedTitle> <HintedTitle>Daegyeom Ha</HintedTitle>
          </Title>
        </div>

        <IntroduceText>
          주변의 번거로운 일을 편리하게 바꾸는 것을 즐겨합니다.
          <br />
          문제를 해결할 때 문제 본질에 더욱 집중하기 위해 노력합니다.
        </IntroduceText>

        <IconList>
          <IconLink href="https://github.com/SkyLightQP/" icon={RiGithubFill}>
            GITHUB
          </IconLink>
          <IconLink href="https://blog.skylightqp.kr/" icon={RiArticleLine}>
            BLOG
          </IconLink>
          <IconLink href="mailto:combbm@gmail.com" icon={RiMailLine}>
            EMAIL
          </IconLink>
        </IconList>

        <ScrollDownText>
          아래에서 이어지는 이야기를 확인해보세요 <RiArrowDropDownLine size={26} />
        </ScrollDownText>
      </MarginContainer>
    </Container>
  );
};

export default Landing;
