import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 3rem 0;
`;

const ContentTitle = styled.p`
  font-weight: bold;
  font-size: 2rem;

  &:after {
    content: '.';
  }
`;

interface ContentBlockProps {
  readonly title: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, children }) => {
  return (
    <Container>
      <ContentTitle>{title}</ContentTitle>
      {children}
    </Container>
  );
};

export default ContentBlock;
