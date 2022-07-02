import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import Section from '../../../database/entity/Section';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';

const handleGet: NextApiWithDB = async (req, res, datasource) => {
  const sectionRepository = datasource.getRepository(Section);
  const data = await sectionRepository.findOneBy({
    id: Number(req.query.id)
  });

  if (data === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  res.status(200).json({ data });
};

const handlePut: NextApiWithDB = async (req, res, datasource) => {
  const id = Number(req.query.id);
  const { title, order } = req.body;
  const sectionRepository = datasource.getRepository(Section);
  const { affected } = await sectionRepository.update({
      id
    },
    {
      title, order
    }
  );

  if (affected === 0) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  res.status(200).json({ data: true });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const datasource = await initDataSource();
  if (datasource === undefined) {
    res.status(500).end();
    return;
  }
  switch (req.method) {
    case 'GET':
      await handleGet(req, res, datasource);
      break;
    case 'PUT':
      await handlePut(req, res, datasource);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end();
  }
  await datasource.destroy();
};

export default withAuth(handler);
