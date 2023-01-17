import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();
  const token = useMemo(() => localStorage.getItem('accessToken'), []);

  useEffect(() => {
    axios
      .get('/api/user/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
  }, [router, token, uid]);

  return uid;
};

export default useUserVerify;
