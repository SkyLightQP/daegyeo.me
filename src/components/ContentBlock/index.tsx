import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 4rem 0;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 26px;

  margin-bottom: 4px;

  &:after {
    content: '.';
  }

  @media screen and (max-width: 420px) {
    font-size: 1.6rem;
  }
`;

interface ContentBlockProps {
  readonly title: string;
}

const ContentBlock: React.FC<PropsWithChildren<ContentBlockProps>> = ({ title, children }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

export default ContentBlock;
