import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from '../api';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    Axios.get('/api/user/verify')
      .then(({ data }) => {
        setUid(data.data.uid);
      })
      .catch((err) => {
        if (err.request.status === 401) {
          setUid(null);
          return router.push('/admin/login');
        }
        return Promise.reject(err);
      });
  }, [router, uid]);

  return uid;
};

export default useUserVerify;
