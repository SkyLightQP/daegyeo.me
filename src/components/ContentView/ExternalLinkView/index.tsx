'use client';

import { FC } from 'react';
import styled from '@emotion/styled';
import { ExternalLink } from '../../Link/ExternalLink';
import { SchemaType } from '../../../types/type-util';

interface ExternalLinkViewProps {
  readonly links: SchemaType<'links'>[];
  readonly isPrint?: boolean;
}

const ExternalLinkGroup = styled.div`
  display: flex;
  flex-direction: row;

  & > a {
    margin-right: 6px;
  }

  & > a:last-child {
    margin-right: 0;
  }
`;

export const ExternalLinkView: FC<ExternalLinkViewProps> = ({ links, isPrint }) => {
  return (
    <ExternalLinkGroup>
      {links
        .sort((a, b) => a.order - b.order)
        .map((link) => (
          <ExternalLink key={link.id} href={link.href}>
            {isPrint ? `${link.name}: ${link.href}` : link.name}
          </ExternalLink>
        ))}
    </ExternalLinkGroup>
  );
};
