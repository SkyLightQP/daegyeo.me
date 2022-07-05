import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Colors from '../../styles/Colors';
import NavigationItem from './NavigationItem';

const Container = styled.div`
  width: 100vw;
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

  const onLogoutClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const isLogout = confirm('로그아웃?');
    if (isLogout) {
      localStorage.removeItem('accessToken');
      router.push('/admin/login');
    }
  };

  return (
    <Container>
      <Link href='/'>
        <NavigationItem tabIndex={0}>홈</NavigationItem>
      </Link>
      <NavigationItem tabIndex={0} active={router.pathname === '/admin'}>섹션</NavigationItem>
      <NavigationItem tabIndex={0} active={router.pathname === '/admin/content'}>컨텐츠</NavigationItem>
      <NavigationItem tabIndex={0} active={router.pathname === '/admin/link'}>링크</NavigationItem>
      <NavigationItem tabIndex={0} onClick={onLogoutClick}>로그아웃</NavigationItem>
    </Container>
  );
};

export default Navigation;
