'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Checkbox, Input, useDisclosure, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { HugeTitle } from '../../components/Typography';
import DraggableTable from '../../components/DraggableTable';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import UpdateModal from '../../components/Dialogs/UpdateModal';
import AdminLayout from '../../layouts/AdminLayout';
import { SchemaType } from '../../types/type-util';
import { Space } from '../../components/Space';
import { createSupabaseClient } from '../../utils/supabase/client';

const Header = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Page: React.FC = () => {
  const [data, setData] = useState<Array<SchemaType<'sections'>>>([]);
  const [isChange, setBeChange] = useState(false);
  const [modalData, setModalData] = useState<{ id: number; title: string; showPdf: boolean }>({
    id: -1,
    title: '',
    showPdf: false
  });
  const { register, handleSubmit, reset } = useForm<{ title: string; showPdf: boolean }>();
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const supabase = createSupabaseClient();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = useCallback(async () => {
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
  }, [supabase]);

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  const onAddClick: SubmitHandler<{ title: string }> = async (values) => {
    if (values.title.trim() === '') return;
    await supabase.from('sections').insert({ title: values.title, order: data.length + 1 });
    await fetchData();
    reset({ title: '' });
  };

  const onChangeData = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === Number(active.id));
    const newIndex = data.findIndex((item) => item.id === Number(over.id));

    setData((prev) => arrayMove(prev, oldIndex, newIndex));
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(onAddClick)();
            }}
            {...register('title', { required: true })}
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
            { key: 'showPdf', label: 'PDF 보이기' },
            { key: 'createdAt', label: '생성일', isDate: true }
          ]}
          onDragEnd={onChangeData}
          onTableUpdateClick={(item) => {
            setModalData({ id: item.id, title: item.title, showPdf: item.showPdf });
            updateDialog.onOpen();
          }}
          onTableDeleteClick={(item) => {
            setModalData({ id: item.id, title: item.title, showPdf: item.showPdf });
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
          { id: 'title', label: '제목', component: <Input /> },
          { id: 'showPdf', label: 'PDF 보이기', component: <Checkbox /> }
        ]}
        defaultValue={[modalData.title, modalData.showPdf]}
        onUpdateClick={async (values) => {
          if (values.title.trim() === '') return;
          await supabase
            .from('sections')
            .update({ title: values.title, showPdf: values.showPdf })
            .match({ id: modalData.id });
          await fetchData();
          updateDialog.onClose();
        }}
      />
    </>
  );
};

export default Page;
