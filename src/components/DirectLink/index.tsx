import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

interface DirectLinkProps {
  readonly href: string;
}

const StyledA = styled.a`
  display: inline-block;

  background-color: #303b4d;
  color: white;

  margin: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const DirectLink: React.FC<DirectLinkProps> = ({ href, children }) => {
  return (
    <StyledA href={href} target="_blank" rel="noopener noreferrer">
      {children} <FontAwesomeIcon icon={faArrowRight} size="sm" />
    </StyledA>
  );
};

export default DirectLink;
