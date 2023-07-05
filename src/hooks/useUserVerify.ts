import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

const useUserVerify = () => {
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user === null) {
      router.push('/admin/login');
    } else {
      setUid(user.id);
    }
  }, [user, router]);

  return uid;
};

export default useUserVerify;
