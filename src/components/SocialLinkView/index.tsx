'use client';

import { FC } from 'react';
import {
  RiCheckLine,
  RiCodeSSlashLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailLine,
  RiPagesLine,
  RiPencilFill
} from '@remixicon/react';
import styled from '@emotion/styled';
import { LargeContentText, SectionTitle } from '../Typography';
import { Space } from '../Space';
import { SocialLink } from '../Link/SocialLink';
import Breakpoint from '../../styles/Breakpoint';

const SocialLinkGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 170px);
  grid-row-gap: 4px;

  @media screen and (max-width: ${Breakpoint.MOBILE}) {
    grid-template-columns: repeat(2, 170px);
  }
`;

export const SocialLinkView: FC = () => {
  return (
    <div>
      <SectionTitle>더 궁금하시다면,</SectionTitle>
      <Space y={6} />
      <LargeContentText>
        <SocialLinkGroup>
          <SocialLink href="mailto:combbm@gmail.com" icon={RiMailLine}>
            이메일
          </SocialLink>
          <SocialLink href="https://github.com/SkyLightQP/" icon={RiGithubFill}>
            GitHub
          </SocialLink>
          <SocialLink href="https://blog.skylightqp.kr/" icon={RiPagesLine}>
            블로그
          </SocialLink>
          <SocialLink href="https://www.acmicpc.net/user/combbm/" icon={RiCodeSSlashLine}>
            Baekjoon
          </SocialLink>
          <SocialLink href="https://solved.ac/profile/combbm/" icon={RiCheckLine}>
            solved.ac
          </SocialLink>
          <SocialLink href="https://til.skylightqp.kr/" icon={RiPencilFill}>
            Today I Learned
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/daegyeom/" icon={RiLinkedinBoxFill}>
            Linkedin
          </SocialLink>
        </SocialLinkGroup>
      </LargeContentText>
    </div>
  );
};
