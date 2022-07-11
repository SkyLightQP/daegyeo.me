import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdminAuth from './firebase-admin';

type NextHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

const withAuth = (handler: NextHandler, exclude?: string[]) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (exclude && (req.method && exclude.includes(req.method))) {
      return handler(req, res);
    }

    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      return res.status(401).json({ error: 'Unauthorized', data: null });
    }

    try {
      const token = authHeader.toString().replace('Bearer ', '');
      await firebaseAdminAuth.verifyIdToken(token);

      return handler(req, res);
    } catch (e) {
      return res.status(401).json({ error: 'Unauthorized', data: null });
    }
  };
};

export default withAuth;
