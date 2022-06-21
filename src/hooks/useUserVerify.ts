import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  const fetchUid = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/user/verify', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setUid(data.data.uid);
    } catch (e) {
      const code = e.request.status;
      if (code === 401) setUid(null);
    }
  }, []);

  useEffect(() => {
    fetchUid().then(() => {
      if (uid === null) {
        router.push('/admin/login');
      }
    });
  }, [fetchUid, router, uid]);

  return uid;
};

export default useUserVerify;
