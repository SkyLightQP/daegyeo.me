'use client';

import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

interface DescriptionViewProps {
  readonly description: string;
}

export const MarkdownWrapper = styled.div`
  & li {
    width: 630px;
    font-size: 16px;
    word-break: break-all;
    padding-left: 12px;
    text-indent: -12px;
    list-style-type: none;
    line-height: 1.6;

    &::before {
      content: '- ';
    }

    @media screen and (max-width: 700px) {
      width: 300px;
    }
  }
`;

export const DescriptionView: FC<DescriptionViewProps> = ({ description }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown>{description}</ReactMarkdown>
    </MarkdownWrapper>
  );
};
