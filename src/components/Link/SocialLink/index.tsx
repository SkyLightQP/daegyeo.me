import React, { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { RemixiconComponentType } from '@remixicon/react';

interface SocialLinkProps {
  readonly href: string;
  readonly icon: RemixiconComponentType;
}

const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  text-decoration: underline;

  & > svg {
    margin-right: 4px;
  }
`;

export const SocialLink: FC<PropsWithChildren<SocialLinkProps>> = ({ href, icon: Icon, children }) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener">
      <Icon size={22} /> {children}
    </StyledLink>
  );
};
