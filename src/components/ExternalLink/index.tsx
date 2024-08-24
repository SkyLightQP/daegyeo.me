import React, { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { RiExternalLinkFill } from '@remixicon/react';
import Colors from '../../styles/Colors';

interface ExternalLinkProps {
  readonly href: string;
}

const StyledLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${Colors.GRAY_DARKEN};
  text-decoration: underline;

  & > svg {
    margin-left: 4px;
  }
`;

export const ExternalLink: FC<PropsWithChildren<ExternalLinkProps>> = ({ href, children }) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener">
      {children} <RiExternalLinkFill size={18} />
    </StyledLink>
  );
};
