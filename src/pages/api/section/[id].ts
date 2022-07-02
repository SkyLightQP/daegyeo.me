import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import Section from '../../../database/entity/Section';
import withAuth from '../../../utils/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const data = await sectionRepository.findOneBy({
    id: Number(req.query.id)
  });

  if (data === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  res.status(200).json({ data });

  await datasource.destroy();
}

export default withAuth(handler);
