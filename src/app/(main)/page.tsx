import React from 'react';
import SectionEntry from '@/components/SectionEntry';
import SocialLinks from '@/components/blocks/SocialLinks';
import { Introduce } from '@/components/blocks/Introduce';
import StackBlock from '@/components/blocks/StackBlock';
import ArticleBlock from '@/components/blocks/ArticleBlock';
import Footer from '@/components/Footer';
import AdminShortcut from '../../components/AdminShortcut';

const Page: React.FC = () => {
  return (
    <>
      <AdminShortcut />

      <Introduce />
      <SocialLinks className="mt-16 py-4" />

      <div className="space-y-16">
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-3">Experience</h2>

          <div className="space-y-6">
            <SectionEntry
              title={
                <>
                  Company&nbsp;
                  <span className="text-sm">(2000.01 - 2100.12)</span>
                </>
              }
              subtitle="Developer"
            >
              <div>
                <p>
                  대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 언론·출판은 타인의 명예나 권리 또는
                  공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는
                  이에 대한 피해의 배상을 청구할 수 있다.
                </p>
              </div>
            </SectionEntry>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Education</h2>

          <div className="space-y-6">
            <SectionEntry
              title={
                <>
                  Company&nbsp;
                  <span className="text-sm">(2000.01 - 2100.12)</span>
                </>
              }
              subtitle="Developer"
            >
              <div>
                <p>
                  대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 언론·출판은 타인의 명예나 권리 또는
                  공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는
                  이에 대한 피해의 배상을 청구할 수 있다.
                </p>
              </div>
            </SectionEntry>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Project</h2>

          <div className="space-y-6">
            <SectionEntry
              title={
                <>
                  Company&nbsp;
                  <span className="text-sm">(2000.01 - 2100.12)</span>
                </>
              }
              subtitle="Developer"
            >
              <div>
                <p>
                  대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 언론·출판은 타인의 명예나 권리 또는
                  공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는
                  이에 대한 피해의 배상을 청구할 수 있다.
                </p>
              </div>
            </SectionEntry>
          </div>
        </div>

        <StackBlock title="Stack">
          TypeScript, Nest.js, Kotlin, Spring Boot, React, MySQL, PostgreSQL, Redis, Docker, AWS
        </StackBlock>

        <div>
          <h2 className="text-xl font-bold mb-3">Licenses &middot; Certifications</h2>

          <div className="space-y-6">
            <SectionEntry
              title={
                <>
                  Company&nbsp;
                  <span className="text-sm">(2000.01 - 2100.12)</span>
                </>
              }
              subtitle="Developer"
            >
              <div>
                <p>
                  대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 언론·출판은 타인의 명예나 권리 또는
                  공중도덕이나 사회윤리를 침해하여서는 아니된다. 언론·출판이 타인의 명예나 권리를 침해한 때에는 피해자는
                  이에 대한 피해의 배상을 청구할 수 있다.
                </p>
              </div>
            </SectionEntry>
          </div>
        </div>

        <ArticleBlock title="Articles">
          <div className="space-y-6">
            <SectionEntry
              title={
                <>
                  Company&nbsp;
                  <span className="text-sm">(2000.01 - 2100.12)</span>
                </>
              }
              subtitle="Developer"
            />
          </div>
        </ArticleBlock>
      </div>

      <Footer />
    </>
  );
};

export default Page;
