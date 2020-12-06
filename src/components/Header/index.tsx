import React from 'react';
import styled from '@emotion/styled';

const TitleContainer = styled.div`
  background-color: #303b4d;

  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

const Title = styled.p`
  font-weight: bold;
  color: white;
  font-size: 3.5rem;

  @media screen and (max-width: 420px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled.p`
  color: white;
  font-size: 1.2rem;

  @media screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Header: React.FC = () => {
  return (
    <TitleContainer>
      <div>
        <Title>하늘빛</Title>
        <SubTitle>Daegyeom Ha</SubTitle>
      </div>
    </TitleContainer>
  );
};

export default Header;
