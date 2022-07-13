import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';
import Content from '../../../database/entity/Content';
import Section from '../../../database/entity/Section';

const handleGet: NextApiWithDB = async (req, res, datasource) => {
  const repository = datasource.getRepository(Content);
  const data = await repository.find({
    order: {
      id: 'ASC'
    },
    relations: {
      section: true,
      links: true
    }
  });

  res.status(200).json({ data });
};

const handlePost: NextApiWithDB = async (req, res, datasource) => {
  const { title, subtitle, description, stack, order, section: sectionId } = req.body;
  const repository = datasource.getRepository(Content);
  const sectionRepository = datasource.getRepository(Section);

  const section = await sectionRepository.findOneBy({ id: Number(sectionId) });
  if (section === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  await repository.insert({
    title,
    subtitle,
    description,
    stack,
    order,
    section
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
