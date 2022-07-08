import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 4rem 0;

  & div {
    margin-bottom: 2.8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ContentTitle = styled.p`
  font-weight: bold;
  font-size: 28px;

  margin-bottom: 4px;

  &:after {
    content: '.';
  }

  @media screen and (max-width: 420px) {
    font-size: 1.8rem;
  }
`;

interface ContentBlockProps {
  readonly title?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, children }) => {
  return (
    <Container>
      {title && <ContentTitle>{title}</ContentTitle>}
      {children}
    </Container>
  );
};

export default ContentBlock;
