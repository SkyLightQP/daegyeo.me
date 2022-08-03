import React from 'react';
import Section from '../../database/entity/Section';
import ContentBlock from '../ContentBlock';
import { Body } from '../Typography';
import ContentDescription from './Description';
import ContentStack from './Stack';
import ContentLink from './Link';
import ContentTitle from './Title';
import VerticalGap from '../VerticalGap';

interface ContentProps {
  readonly sections: Section[];
}

const Content: React.FC<ContentProps> = ({ sections }) => {
  return (
    <>
      {(sections as Section[]).map((section) => (
        <ContentBlock key={section.id} title={section.title}>
          {section.contents.map((content) => (
            <div key={content.id}>
              <ContentTitle content={content} />
              <Body>
                <ContentDescription content={content} />
                <ContentStack content={content} />
                <ContentLink links={content.links} />
              </Body>
              {content.description !== '' && content.stack !== '' ? <VerticalGap gap={40} /> : <></>}
            </div>
          ))}
        </ContentBlock>
      ))}
    </>
  );
};

export default Content;
