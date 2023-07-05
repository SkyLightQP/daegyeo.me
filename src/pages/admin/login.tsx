import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { Title } from '../../components/Typography';
import VerticalGap from '../../components/VerticalGap';
import Colors from '../../styles/Colors';
import { useSupabase } from '../../utils/supabase';

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
  const supabase = useSupabase();
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: input.email, password: input.password });
      if (error !== null) {
        toast({
          title: 'Credential Error',
          description: error.message,
          status: 'error'
        });
        return;
      }
      if (data.user !== null && data.session !== null) await router.push('/admin');
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error'
      });
    }
  };

  return (
    <Container>
      <Title>Admin Login</Title>
      <VerticalGap gap={16} />
      <Input
        type="email"
        placeholder="Email"
        value={input.email}
        onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
      />
      <VerticalGap gap={10} />
      <Input
        type="password"
        placeholder="Password"
        value={input.password}
        onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
        onKeyUp={(e) => {
          if (e.key === 'Enter') login();
        }}
      />
      <VerticalGap gap={10} />
      <LoginButton onClick={login}>Login</LoginButton>
    </Container>
  );
};

export default Login;
