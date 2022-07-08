import type { NextApiRequest, NextApiResponse } from 'next';
import type { DataSource } from 'typeorm';

export type NextApiWithDB = (req: NextApiRequest, res: NextApiResponse, datasource: DataSource) => Promise<void> | void;
