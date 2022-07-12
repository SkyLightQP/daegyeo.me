import { NextApiRequest, NextApiResponse } from 'next';
import { initDataSource } from '../../../database/data-source';
import withAuth from '../../../utils/withAuth';
import { NextApiWithDB } from '../../../types/api-type';
import Content from '../../../database/entity/Content';
import Section from '../../../database/entity/Section';

const handleGet: NextApiWithDB = async (req, res, datasource) => {
  const repository = datasource.getRepository(Content);
  const data = await repository.findOneBy({
    id: Number(req.query.id)
  });

  if (data === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  res.status(200).json({ data });
};

const handlePatch: NextApiWithDB = async (req, res, datasource) => {
  const id = Number(req.query.id);
  const { title, subtitle, description, stack, section: sectionId } = req.body;
  const repository = datasource.getRepository(Content);
  const sectionRepository = datasource.getRepository(Section);

  const section = await sectionRepository.findOneBy({ id: Number(sectionId) });
  if (sectionId !== undefined && section === null) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  const { affected } = await repository.update(
    {
      id
    },
    {
      title,
      subtitle,
      description,
      stack,
      section: sectionId !== undefined && section !== null ? section : undefined
    }
  );

  if (affected === 0) {
    res.status(404).json({ error: 'Not Found', data: null });
    return;
  }

  res.status(200).json({ data: true });
};

const handleDelete: NextApiWithDB = async (req, res, datasource) => {
  const id = Number(req.query.id);
  const repository = datasource.getRepository(Content);
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
    case 'GET':
      await handleGet(req, res, datasource);
      break;
    case 'PATCH':
      await handlePatch(req, res, datasource);
      break;
    case 'DELETE':
      await handleDelete(req, res, datasource);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end();
  }
  await datasource.destroy();
};

export default withAuth(handler);
