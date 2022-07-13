import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';
import Content from '../../../database/entity/Content';
import Link from '../../../database/entity/Link';

const handleGet: NextApiWithDB = async (req, res, datasource) => {
  const repository = datasource.getRepository(Link);
  const data = await repository.find({
    order: {
      id: 'ASC'
    }
  });

  res.status(200).json({ data });
};

const handlePost: NextApiWithDB = async (req, res, datasource) => {
  const { name, href, order, contentId } = req.body;
  const repository = datasource.getRepository(Link);
  const contentRepository = datasource.getRepository(Content);

  const content = await contentRepository.findOneBy({ id: Number(contentId) });
  if (content === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  await repository.insert({
    name,
    href,
    order,
    content
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

export default withAuth(handler);
