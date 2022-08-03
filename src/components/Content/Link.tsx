import React, { Fragment } from 'react';
import Link from '../../database/entity/Link';
import DirectLink from '../DirectLink';
import HorizontalGap from '../HorizontalGap';

interface LinkProps {
  readonly links: Link[];
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
