import React from 'react';
import Content from '../../database/entity/Content';

interface DescriptionProps {
  readonly content: Content;
}

const ContentDescription: React.FC<DescriptionProps> = ({ content }) => {
  if (content.description) {
    return (
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {content.description} <br />
      </span>
    );
  }

  return <></>;
};

export default ContentDescription;
