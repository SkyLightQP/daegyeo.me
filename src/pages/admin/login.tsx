import React, { useState } from 'react';
import styled from '@emotion/styled';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Title } from '../../components/Typography';
import firebaseAuth from '../../utils/firebase';
import VerticalGap from '../../components/VerticalGap';
import Colors from '../../styles/Colors';

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${Colors.PRIMARY};
`;

const Input = styled.input`
  width: 240px;
  height: 40px;

  border: 1px solid #e7e7e7;
  border-radius: 10px;

  padding: 0.5rem 1rem;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;

  color: white;
  background-color: ${Colors.PRIMARY};

  border: none;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState<{ email: string; password: string; }>({
    email: '',
    password: ''
  });
  const [err, setError] = useState<string>('');

  const login = async () => {
    try {
      const info = await signInWithEmailAndPassword(firebaseAuth, input.email, input.password);
      localStorage.setItem('accessToken', await info.user.getIdToken());
      router.push('/admin');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Container>
      <Title>Admin Login</Title>
      <VerticalGap gap={16} />
      <Input
        type='email'
        placeholder='Email'
        value={input.email}
        onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
      />
      <VerticalGap gap={10} />
      <Input
        type='password'
        placeholder='Password'
        value={input.password}
        onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
        onKeyPress={(e) => {
          if (e.key === 'Enter') login();
        }}
      />
      <VerticalGap gap={10} />
      <LoginButton onClick={login}>Login</LoginButton>
      <VerticalGap gap={16} />
      <p>{err}</p>
    </Container>
  );
};

export default Login;
