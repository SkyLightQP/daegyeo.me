import React from 'react';
import Content from '../../database/entity/Content';

interface StackProps {
  readonly content: Content;
}

const ContentStack: React.FC<StackProps> = ({ content }) => {
  if (content.stack) {
    return (
      <>
        with <b>{content.stack}</b> <br />
      </>
    );
  }

  return <></>;
};

export default ContentStack;
