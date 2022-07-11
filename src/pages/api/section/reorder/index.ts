import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../../database/data-source';
import Section from '../../../../database/entity/Section';
import withAuth from '../../../../utils/withAuth';
import { NextApiWithDB } from '../../../../types/api-type';

const handlePatch: NextApiWithDB = async (req, res, datasource) => {
  const { ids } = req.body;
  const sectionRepository = datasource.getRepository(Section);

  const promisedMap = (ids as number[]).map(async (id, index) => {
    await sectionRepository.update({ id }, {
      order: index + 1
    });
  });
  await Promise.all(promisedMap);

  res.status(200).json({ data: true });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const datasource = await initDataSource();
  if (datasource === undefined) {
    res.status(500).end();
    return;
  }
  switch (req.method) {
    case 'PATCH':
      await handlePatch(req, res, datasource);
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end();
  }
  await datasource.destroy();
};

export default withAuth(handler);