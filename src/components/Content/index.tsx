import React from 'react';
import ContentBlock from '../ContentBlock';
import { Body } from '../Typography';
import ContentDescription from './Description';
import ContentStack from './Stack';
import ContentLink from './Link';
import ContentTitle from './Title';
import VerticalGap from '../VerticalGap';
import { SchemaType } from '../../types/type-util';

interface ContentProps {
  readonly sections: Array<
    SchemaType<'sections'> & {
      contents: Array<SchemaType<'contents'> & { links: SchemaType<'links'>[] }>;
    }
  >;
}

const Content: React.FC<ContentProps> = ({ sections }) => {
  return (
    <>
      {sections
        .sort((a, b) => a.order - b.order)
        .map(
          (section) =>
            section.contents.length > 0 && (
              <ContentBlock key={section.id} title={section.title}>
                {section.contents
                  .sort((a, b) => a.order - b.order)
                  .map((content) => (
                    <div key={content.id}>
                      <ContentTitle content={content} />
                      <Body>
                        <VerticalGap gap={4} />
                        <ContentDescription content={content} />
                        <ContentStack content={content} />
                        <VerticalGap gap={4} />
                        <ContentLink links={content.links} />
                      </Body>
                      {content.hasMargin ? <VerticalGap gap={40} /> : <></>}
                    </div>
                  ))}
              </ContentBlock>
            )
        )}
    </>
  );
};

export default Content;
