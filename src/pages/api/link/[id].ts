import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';
import Link from '../../../database/entity/Link';

const handleDelete: NextApiWithDB = async (req, res, datasource) => {
  const id = Number(req.query.id);
  const repository = datasource.getRepository(Link);
  const data = await repository.findOneBy({ id });

  if (data === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  await repository.delete({ id });

  res.status(200).json({ data: true });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const datasource = await initDataSource();
  if (datasource === undefined) {
    res.status(500).end();
    return;
  }
  switch (req.method) {
    case 'DELETE':
      await handleDelete(req, res, datasource);
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end();
  }
  await datasource.destroy();
};

export default withAuth(handler);
