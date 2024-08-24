import React, { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { RemixiconComponentType } from '@remixicon/react';

interface IconLinkProps {
  readonly href: string;
  readonly icon: RemixiconComponentType;
}

const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: white;
  text-decoration: underline;

  & svg {
    margin-right: 4px;
  }

  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;

export const IconLink: FC<PropsWithChildren<IconLinkProps>> = ({ href, icon: Icon, children }) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener">
      <Icon size={22} /> {children}
    </StyledLink>
  );
};
