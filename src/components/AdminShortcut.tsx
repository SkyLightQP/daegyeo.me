'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useHotkeys } from 'react-hotkeys-hook';

/** A + D 동시 입력으로 어드민 페이지로 이동하는 숨은 단축키 */
const AdminShortcut: FC = () => {
  const router = useRouter();

  useHotkeys('a+d', () => router.push('/admin'), { preventDefault: true });

  return null;
};

export default AdminShortcut;
