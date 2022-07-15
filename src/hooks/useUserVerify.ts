import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('/api/user/verify', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') ?? 'NOT_FOUND_TOKEN'}`
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
  }, [router, uid]);

  return uid;
};

export default useUserVerify;
