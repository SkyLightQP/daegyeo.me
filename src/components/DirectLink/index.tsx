import React, { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';
import Colors from '../../styles/Colors';

interface DirectLinkProps {
  readonly href: string;
}

const StyledA = styled.a`
  display: inline-block;

  background-color: ${Colors.PRIMARY};
  color: white;

  margin: 4px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.span`
  font-size: 16px;
`;

const DirectLink: React.FC<PropsWithChildren<DirectLinkProps>> = ({ href, children }) => {
  return (
    <StyledA href={href} target="_blank" rel="noopener noreferrer">
      <Text>{children}</Text> <FontAwesomeIcon icon={faArrowRight} size="sm" />
    </StyledA>
  );
};

export default DirectLink;
