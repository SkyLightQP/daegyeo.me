import React from 'react';
import { SchemaType } from '../../types/type-util';

interface StackProps {
  readonly content: SchemaType<'contents'>;
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
