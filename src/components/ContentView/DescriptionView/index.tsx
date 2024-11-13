'use client';

import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

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

    &:lang(ko) {
      word-break: keep-all;
    }

    @media screen and (max-width: 700px) {
      width: 300px;
    }
  }

  & summary {
    cursor: pointer;
    padding-left: 2px;
  }

  & details ul,
  p {
    padding-left: 12px;
  }
`;

export const DescriptionView: FC<DescriptionViewProps> = ({ description }) => {
  return (
    <MarkdownWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {description}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};
