/** @jsxImportSource @emotion/react */

'use client';

import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Select, Td, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { HugeTitle } from '../../../components/Typography';
import DraggableTable from '../../../components/DraggableTable';
import DeleteModal from '../../../components/Dialogs/DeleteModal';
import UpdateModal from '../../../components/Dialogs/UpdateModal';
import AdminLayout from '../../../layouts/AdminLayout';
import LinkModal from '../../../components/Dialogs/LinkModal';
import { SchemaType } from '../../../types/type-util';
import { Space } from '../../../components/Space';
import ImageModal from '../../../components/Dialogs/ImageModal';
import { createSupabaseClient } from '../../../utils/supabase/client';

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface AddForm {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly section: string;
  readonly hasMargin: boolean;
  readonly isHidden: boolean;
  readonly showPdf: boolean;
}

const DEFAULT_VALUE: AddForm = {
  title: '',
  subtitle: '',
  description: '',
  section: '',
  hasMargin: true,
  isHidden: false,
  showPdf: false
};

const Page: React.FC = () => {
  const [data, setData] = useState<Array<SchemaType<'contents'> & { sections: SchemaType<'sections'> }>>([]);
  const [section, setSection] = useState<Array<SchemaType<'sections'>>>([]);
  const [isChange, setBeChange] = useState(false);
  const { register, handleSubmit, reset } = useForm<AddForm>({ defaultValues: { hasMargin: DEFAULT_VALUE.hasMargin } });
  const [modalData, setModalData] = useState<{ id: number; value: AddForm }>({ id: -1, value: DEFAULT_VALUE });
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const linkDialog = useDisclosure();
  const imageDialog = useDisclosure();
  const supabase = createSupabaseClient();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = useCallback(async () => {
    const { data: response, error } = await supabase.from('contents').select('*, sections(*)');
    if (error !== null) {
      toast({
        title: 'Database Error',
        description: error?.message ?? 'Unknown Error',
        status: 'error'
      });
      return;
    }
    const contents = response as Array<SchemaType<'contents'> & { sections: SchemaType<'sections'> }>;
    setData(contents.sort((a, b) => a.order - b.order).sort((a, b) => a.sections.order - b.sections.order));
  }, [supabase]);

  const onChangeData = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === Number(active.id));
    const newIndex = data.findIndex((item) => item.id === Number(over.id));

    setData((prev) => arrayMove(prev, oldIndex, newIndex));
    setBeChange(true);
  };

  const onAddClick: SubmitHandler<AddForm> = async (values) => {
    await supabase.from('contents').insert({
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      stack: '',
      sectionId: Number(values.section),
      order: data.length + 1,
      hasMargin: values.hasMargin,
      isHidden: values.isHidden
    });
    await fetchData();
    reset(DEFAULT_VALUE);
  };

  const onApplyClick = async () => {
    if (!isChange) return;
    const promised = data
      .map((item) => item.id)
      .map(async (id, index) => {
        await supabase
          .from('contents')
          .update({ order: index + 1 })
          .match({ id });
      });
    await Promise.all(promised);
    setBeChange(false);
  };

  useEffect(() => {
    fetchData()
      .then(() => supabase.from('sections').select('*'))
      .then(({ data: sections }) => {
        if (sections !== null) setSection(sections);
      });
  }, [fetchData, supabase]);

  const SectionOptions = useCallback(
    () => (
      <>
        {section.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </>
    ),
    [section]
  );

  return (
    <>
      <AdminLayout>
        <HugeTitle>컨텐츠 관리</HugeTitle>
        <Space y={10} />
        <Header>
          <Input
            placeholder="제목"
            background="white"
            css={css`
              grid-column: 1 / 4;
            `}
            {...register('title', { required: true })}
          />
          <Input
            placeholder="부제목 (풀스택, 2024)"
            background="white"
            css={css`
              grid-column: 4 / 6;
            `}
            {...register('subtitle')}
          />

          <div
            style={{
              gridColumn: '1 / 3',
              marginRight: '26px'
            }}
          >
            <Select placeholder="섹션" background="white" {...register('section', { required: true })}>
              <SectionOptions />
            </Select>
          </div>
          <Checkbox
            css={css`
              grid-column: 3 / 4;
            `}
            {...register('hasMargin')}
          >
            컨텐츠 간 간격 추가
          </Checkbox>
          <Checkbox
            css={css`
              grid-column: 4 / 5;
            `}
            {...register('isHidden')}
          >
            숨김
          </Checkbox>
          <Checkbox
            css={css`
              grid-column: 5 / 6;
            `}
            {...register('showPdf')}
          >
            PDF 보이기
          </Checkbox>
          <Textarea
            placeholder="내용"
            background="white"
            css={css`
              grid-column: 1 / 6;
              height: 200px;
              resize: none;
            `}
            {...register('description')}
          />
          <Button
            colorScheme="blue"
            fontWeight="normal"
            onClick={handleSubmit(onAddClick)}
            css={css`
              grid-column: 1/6;
            `}
          >
            컨텐츠 추가
          </Button>
        </Header>
        <Space y={20} />
        <DraggableTable
          useImageControl
          useLinkControl
          data={data}
          columns={[
            { key: 'title', label: '제목' },
            { key: 'sections', label: '섹션', render: (item) => <Td>{item.sections.title}</Td> },
            { key: 'createdAt', label: '생성일', isDate: true }
          ]}
          onDragEnd={onChangeData}
          onTableUpdateClick={(item) => {
            setModalData({
              id: item.id,
              value: {
                title: item.title,
                subtitle: item.subtitle,
                description: item.description,
                section: String(item.sections.id),
                hasMargin: item.hasMargin,
                isHidden: item.isHidden,
                showPdf: item.showPdf
              }
            });
            updateDialog.onOpen();
          }}
          onTableDeleteClick={(item) => {
            setModalData({
              id: item.id,
              value: {
                title: item.title,
                subtitle: item.subtitle,
                description: item.description,
                section: String(item.sections.id),
                hasMargin: item.hasMargin,
                isHidden: item.isHidden,
                showPdf: item.showPdf
              }
            });
            deleteDialog.onOpen();
          }}
          onTableLinkClick={(item) => {
            setModalData((prev) => ({ ...prev, id: item.id }));
            linkDialog.onOpen();
          }}
          onTableImageClick={(item) => {
            setModalData((prev) => ({ ...prev, id: item.id }));
            imageDialog.onOpen();
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
        title="컨텐츠 삭제하기"
        modalController={deleteDialog}
        onDeleteClick={async () => {
          await supabase.from('contents').delete().match({ id: modalData.id });
          await fetchData();
          deleteDialog.onClose();
        }}
      >
        {modalData.value.title} 컨텐츠 삭제 시 세부 내용이 함께 삭제됩니다.
      </DeleteModal>
      <UpdateModal
        modalController={updateDialog}
        fields={[
          { id: 'title', label: '제목', component: <Input /> },
          { id: 'subtitle', label: '부제목', component: <Input /> },
          { id: 'description', label: '내용', component: <Textarea height="sm" /> },
          { id: 'section', label: '섹션', component: <Select />, option: <SectionOptions /> },
          { id: 'hasMargin', label: '컨텐츠 간 간격 추가', component: <Checkbox /> },
          { id: 'isHidden', label: '숨김', component: <Checkbox /> },
          { id: 'showPdf', label: 'PDF 보이기', component: <Checkbox /> }
        ]}
        defaultValue={[
          modalData.value.title,
          modalData.value.subtitle,
          modalData.value.description,
          modalData.value.section,
          modalData.value.hasMargin,
          modalData.value.isHidden,
          modalData.value.showPdf
        ]}
        onUpdateClick={async (values) => {
          await supabase
            .from('contents')
            .update({
              title: values.title,
              subtitle: values.subtitle,
              description: values.description,
              sectionId: Number(values.section),
              hasMargin: values.hasMargin,
              isHidden: values.isHidden,
              showPdf: values.showPdf
            })
            .match({ id: modalData.id });
          await fetchData();
          updateDialog.onClose();
        }}
      />
      <LinkModal modalController={linkDialog} dataId={modalData.id} />
      <ImageModal modalController={imageDialog} dataId={modalData.id} />
    </>
  );
};

export default Page;
