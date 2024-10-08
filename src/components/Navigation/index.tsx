import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiHeading, RiHome3Line, RiListCheck, RiLogoutBoxLine } from '@remixicon/react';
import Colors from '../../styles/Colors';
import NavigationItem from './NavigationItem';
import { useSupabase } from '../../utils/supabase';

const Container = styled.div`
  height: 60px;

  background-color: ${Colors.PRIMARY};

  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: white;

  padding: 0 80px 0 200px;

  @media screen and (max-width: 420px) {
    padding: 0 32px;
  }
`;

const Navigation: React.FC = () => {
  const router = useRouter();
  const supabase = useSupabase();

  const onLogoutClick = () => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    const isLogout = confirm('정말로 로그아웃 하시겠습니까?');
    if (isLogout) {
      localStorage.removeItem('accessToken');
      supabase.auth
        .signOut()
        .then(() => router.push('/admin/login'))
        .then();
    }
  };

  return (
    <Container>
      <Link href="/">
        <NavigationItem tabIndex={0}>
          <RiHome3Line size={16} /> 홈
        </NavigationItem>
      </Link>
      <Link href="/admin">
        <NavigationItem tabIndex={0} active={router.pathname === '/admin'}>
          <RiHeading size={16} /> 섹션
        </NavigationItem>
      </Link>
      <Link href="/admin/content">
        <NavigationItem tabIndex={0} active={router.pathname === '/admin/content'}>
          <RiListCheck size={16} /> 컨텐츠
        </NavigationItem>
      </Link>
      <NavigationItem tabIndex={0} onClick={onLogoutClick}>
        <RiLogoutBoxLine size={16} /> 로그아웃
      </NavigationItem>
    </Container>
  );
};

export default Navigation;
