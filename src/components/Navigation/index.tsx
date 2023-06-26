import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faHeading, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Colors from '../../styles/Colors';
import NavigationItem from './NavigationItem';
import useSupabase from '../../hooks/useSupabase';

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
          <FontAwesomeIcon icon={faHome} size="sm" /> 홈
        </NavigationItem>
      </Link>
      <Link href="/admin">
        <NavigationItem tabIndex={0} active={router.pathname === '/admin'}>
          <FontAwesomeIcon icon={faHeading} size="sm" /> 섹션
        </NavigationItem>
      </Link>
      <Link href="/admin/content">
        <NavigationItem tabIndex={0} active={router.pathname === '/admin/content'}>
          <FontAwesomeIcon icon={faAlignJustify} size="sm" /> 컨텐츠
        </NavigationItem>
      </Link>
      <NavigationItem tabIndex={0} onClick={onLogoutClick}>
        <FontAwesomeIcon icon={faSignOutAlt} size="sm" /> 로그아웃
      </NavigationItem>
    </Container>
  );
};

export default Navigation;
