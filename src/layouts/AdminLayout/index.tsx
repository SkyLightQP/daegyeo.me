import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import Navigation from '../../components/Navigation';

import Colors from '../../styles/Colors';
import { Space } from '../../components/Space';

const Container = styled.div`
  color: ${Colors.PRIMARY};

  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    max-width: 360px;
  }
`;

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Space y={30} />
      <Container>{children}</Container>
    </>
  );
};

export default AdminLayout;
