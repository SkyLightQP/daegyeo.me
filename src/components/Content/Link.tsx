import React, { Fragment } from 'react';
import DirectLink from '../DirectLink';
import HorizontalGap from '../HorizontalGap';
import { SchemaType } from '../../types/type-util';

interface LinkProps {
  readonly links: SchemaType<'links'>[];
}

const ContentLink: React.FC<LinkProps> = ({ links }) => {
  if (links && links.length > 0) {
    return (
      <>
        {links
          .sort((a, b) => a.order - b.order)
          .map((link) => (
            <Fragment key={link.id}>
              <DirectLink href={link.href}>{link.name}</DirectLink>
              <HorizontalGap gap={8} />
            </Fragment>
          ))}
      </>
    );
  }

  return <></>;
};

export default ContentLink;
