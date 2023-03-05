import React from 'react';
import Content from '../../database/entity/Content';
import VerticalGap from '../VerticalGap';

interface StackProps {
  readonly content: Content;
}

const ContentStack: React.FC<StackProps> = ({ content }) => {
  if (content.stack) {
    return (
      <>
        <VerticalGap gap={4} />
        with <b>{content.stack}</b> <br />
        <VerticalGap gap={4} />
      </>
    );
  }

  return <></>;
};

export default ContentStack;
