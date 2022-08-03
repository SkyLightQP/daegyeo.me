import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import Section from '../../../database/entity/Section';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';

const handleGet: NextApiWithDB = async (req, res, datasource) => {
  const sectionRepository = datasource.getRepository(Section);
  const data = await sectionRepository.find({
    order: {
      id: 'ASC'
    },
    relations: {
      contents: {
        links: true
      }
    }
  });

  res.status(200).json({ data });
};

const handlePost: NextApiWithDB = async (req, res, datasource) => {
  const { title, order } = req.body;

  const sectionRepository = datasource.getRepository(Section);
  await sectionRepository.insert({
    title,
    order
  });

  res.status(201).json({ data: true });
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
    case 'POST':
      await handlePost(req, res, datasource);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end();
  }
  await datasource.destroy();
};

export default withAuth(handler, ['GET']);
