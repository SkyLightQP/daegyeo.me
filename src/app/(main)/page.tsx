import React from 'react';
import SocialLinks from '../../components/blocks/SocialLinks';
import { Introduce } from '../../components/blocks/Introduce';
import Footer from '../../components/Footer';
import SectionBlocks from '../../components/SectionBlocks';
import AdminShortcut from '../../components/AdminShortcut';
import { getContentData } from '../../lib/queries/content-data';

const Page = async () => {
  const { sections, contents } = await getContentData();

  return (
    <>
      <AdminShortcut />

      <Introduce />
      <SocialLinks className="mt-16 py-4" />

      <SectionBlocks sections={sections} contents={contents} className="mt-16" />

      <Footer />
    </>
  );
};

export default Page;
