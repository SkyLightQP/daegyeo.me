import React from 'react';
import useUserVerify from '../../hooks/useUserVerify';
import Navigation from '../../components/Navigation';

const Admin: React.FC = () => {
  const _ = useUserVerify();

  return (
    <>
      <Navigation />
    </>
  );
};

export default Admin;
