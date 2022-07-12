import React from 'react';
import styled from '@emotion/styled';
import Navigation from '../../components/Navigation';
import VerticalGap from '../../components/VerticalGap';
import Colors from '../../styles/Colors';

const Container = styled.div`
  color: ${Colors.PRIMARY};

  max-width: 960px;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    max-width: 360px;
  }
`;

const AdminLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      <VerticalGap gap={30} />
      <Container>{children}</Container>
    </>
  );
};

export default AdminLayout;
