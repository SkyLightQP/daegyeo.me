'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { SectionTitle } from '../../../components/Typography';
import Colors from '../../../styles/Colors';
import { Space } from '../../../components/Space';
import { createSupabaseClient } from '../../../utils/supabase/client';

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${Colors.PRIMARY};
`;

const Input = styled.input`
  width: 280px;
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

const Page: React.FC = () => {
  const router = useRouter();
  const supabase = createSupabaseClient();
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error'
        });
      }
    }
  };

  return (
    <Container>
      <SectionTitle>daegyeo.me</SectionTitle>
      <SectionTitle>관리자 로그인</SectionTitle>
      <Space y={20} />
      <Input
        type="email"
        placeholder="이메일"
        value={input.email}
        onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
      />
      <Space y={14} />
      <Input
        type="password"
        placeholder="비밀번호"
        value={input.password}
        onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
        onKeyUp={(e) => {
          if (e.key === 'Enter') login();
        }}
        autoComplete="off"
      />
      <Space y={20} />
      <LoginButton onClick={login}>Login</LoginButton>
    </Container>
  );
};

export default Page;
