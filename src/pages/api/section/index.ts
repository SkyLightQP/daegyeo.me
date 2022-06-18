import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import Section from '../../../database/entity/Section';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end();
  }

  const datasource = await initDataSource();
  if (datasource === undefined) {
    res.status(500).end();
    return;
  }

  const sectionRepository = datasource.getRepository(Section);
  const data = await sectionRepository.find({
    order: {
      id: 'ASC'
    }
  });

  res.status(200).json({ data });

  await datasource.destroy();
}
