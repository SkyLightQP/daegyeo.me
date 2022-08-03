import React from 'react';
import Content from '../../database/entity/Content';
import { Subtitle, Title } from '../Typography';

interface TitleProps {
  readonly content: Content;
}

const ContentTitle: React.FC<TitleProps> = ({ content }) => {
  return (
    <Title>
      {content.title} <Subtitle>{content.subtitle}</Subtitle>
    </Title>
  );
};

export default ContentTitle;
