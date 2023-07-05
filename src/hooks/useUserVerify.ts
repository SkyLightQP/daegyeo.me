import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabase } from '../utils/supabase';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();
  const supabase = useSupabase();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session === null) {
          router.push('/admin/login');
        }

        setUid(session?.user.id);
      })
      .catch((err) => Promise.reject(err));
  }, [supabase, router]);

  return uid;
};

export default useUserVerify;
