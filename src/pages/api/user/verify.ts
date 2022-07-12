import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdminAuth from '../../../utils/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end();
    return;
  }

  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(401).json({ error: 'Unauthorized', data: null });
    return;
  }

  try {
    const token = authHeader.toString().replace('Bearer ', '');
    const decode = await firebaseAdminAuth.verifyIdToken(token);

    res.status(200).json({ data: { uid: decode.uid } });
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized', data: null });
  }
};
