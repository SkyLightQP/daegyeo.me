import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import Content from '../../database/entity/Content';

const MarkdownWrapper = styled.div`
  li {
    list-style-position: inside;
  }

  ul ul {
    text-indent: 20px;
  }

  ul ul ul {
    text-indent: 40px;
  }

  ul ul ul ul {
    text-indent: 60px;
  }
`;

interface DescriptionProps {
  readonly content: Content;
}

const ContentDescription: React.FC<DescriptionProps> = ({ content }) => {
  if (content.description) {
    return (
      <MarkdownWrapper>
        <ReactMarkdown>{content.description}</ReactMarkdown>
      </MarkdownWrapper>
    );
  }

  return <></>;
};

export default ContentDescription;
