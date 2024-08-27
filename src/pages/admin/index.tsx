import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, useDisclosure, useToast } from '@chakra-ui/react';
import { DropResult } from 'react-beautiful-dnd';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserVerify from '../../hooks/useUserVerify';
import { HugeTitle } from '../../components/Typography';
import DraggableTable from '../../components/DraggableTable';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import UpdateModal from '../../components/Dialogs/UpdateModal';
import AdminLayout from '../../layouts/AdminLayout';
import { useSupabase } from '../../utils/supabase';
import { SchemaType } from '../../types/type-util';
import { Space } from '../../components/Space';

const Header = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Admin: React.FC = () => {
  useUserVerify();
  const [data, setData] = useState<Array<SchemaType<'sections'>>>([]);
  const [isChange, setBeChange] = useState(false);
  const [modalData, setModalData] = useState<{ id: number; title: string }>({ id: -1, title: '' });
  const { register, handleSubmit, reset } = useForm<{ title: string }>();
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const supabase = useSupabase();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = async () => {
    const { data: sections, error } = await supabase.from('sections').select('*');
    if (sections === null || error !== null) {
      toast({
        title: 'Database Error',
        description: error?.message ?? 'Unknown Error',
        status: 'error'
      });
      return;
    }
    setData(sections.sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const onAddClick: SubmitHandler<{ title: string }> = async (values) => {
    if (values.title.trim() === '') return;
    await supabase.from('sections').insert({ title: values.title, order: data.length + 1 });
    await fetchData();
    reset({ title: '' });
  };

  const onChangeData = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
    setBeChange(true);
  };

  const onApplyClick = async () => {
    if (!isChange) return;
    const promised = data
      .map((item) => item.id)
      .map(async (id, index) => {
        await supabase
          .from('sections')
          .update({ order: index + 1 })
          .match({ id });
      });
    await Promise.all(promised);
    setBeChange(false);
  };

  return (
    <>
      <AdminLayout>
        <HugeTitle>섹션 관리</HugeTitle>
        <Space y={10} />
        <Header>
          <Input
            placeholder="섹션 이름"
            background="white"
            {...register('title', { required: true })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit(onAddClick)();
            }}
          />
          <Button colorScheme="blue" fontWeight="normal" onClick={handleSubmit(onAddClick)}>
            섹션 추가
          </Button>
        </Header>
        <Space y={10} />
        <DraggableTable
          data={data}
          columns={[
            { key: 'title', label: '제목' },
            { key: 'createdAt', label: '생성일', isDate: true }
          ]}
          onDragEnd={onChangeData}
          onTableUpdateClick={(item) => {
            setModalData({ id: item.id, title: item.title });
            updateDialog.onOpen();
          }}
          onTableDeleteClick={(item) => {
            setModalData({ id: item.id, title: item.title });
            deleteDialog.onOpen();
          }}
        />
        <Space y={10} />
        <Footer>
          <Button colorScheme="green" fontWeight="normal" onClick={() => fetchData().then(() => setBeChange(false))}>
            새로고침
          </Button>
          <Space x={10} />
          <Button disabled={!isChange} colorScheme="blue" fontWeight="normal" onClick={onApplyClick}>
            적용
          </Button>
        </Footer>
      </AdminLayout>

      <DeleteModal
        title="섹션 삭제하기"
        modalController={deleteDialog}
        onDeleteClick={async () => {
          await supabase.from('sections').delete().match({ id: modalData.id });
          await fetchData();
          deleteDialog.onClose();
        }}
      >
        섹션 내 컨텐츠가 없을 때만 삭제가 가능합니다.
      </DeleteModal>
      <UpdateModal
        modalController={updateDialog}
        fields={[
          {
            id: 'title',
            label: '제목',
            component: Input
          }
        ]}
        defaultValue={[modalData.title]}
        onUpdateClick={async (values) => {
          if (values.title.trim() === '') return;
          await supabase.from('sections').update({ title: values.title }).match({ id: modalData.id });
          await fetchData();
          updateDialog.onClose();
        }}
      />
    </>
  );
};

export default Admin;
