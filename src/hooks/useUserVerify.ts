import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from '../api';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  const fetchUid = useCallback(async () => {
    try {
      const { data } = await Axios.get('/api/user/verify');
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
