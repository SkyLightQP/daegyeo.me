import React from 'react';
import Content from '../../database/entity/Content';
import { Subtitle, Title } from '../Typography';
import { SchemaType } from '../../types/type-util';

interface TitleProps {
  readonly content: SchemaType<'contents'>;
}

const ContentTitle: React.FC<TitleProps> = ({ content }) => {
  return (
    <Title>
      {content.title} <Subtitle>{content.subtitle}</Subtitle>
    </Title>
  );
};

export default ContentTitle;
