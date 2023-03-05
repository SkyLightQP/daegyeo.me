/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Select, Td, Textarea, useDisclosure } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { DropResult } from 'react-beautiful-dnd';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserVerify from '../../hooks/useUserVerify';
import Axios from '../../api';
import VerticalGap from '../../components/VerticalGap';
import { HugeTitle } from '../../components/Typography';
import HorizontalGap from '../../components/HorizontalGap';
import Content from '../../database/entity/Content';
import DraggableTable from '../../components/DraggableTable';
import Section from '../../database/entity/Section';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import UpdateModal from '../../components/Dialogs/UpdateModal';
import AdminLayout from '../../layouts/AdminLayout';
import LinkModal from '../../components/Dialogs/LinkModal';

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
  readonly stack: string;
  readonly section: string;
  readonly hasMargin: boolean;
}

const DEFAULT_VALUE: AddForm = {
  title: '',
  subtitle: '',
  description: '',
  stack: '',
  section: '',
  hasMargin: true
};

const AdminContent: React.FC = () => {
  useUserVerify();
  const [data, setData] = useState<Array<Content & { section: Section }>>([]);
  const [section, setSection] = useState<Section[]>([]);
  const [isChange, setBeChange] = useState(false);
  const { register, handleSubmit, reset } = useForm<AddForm>({ defaultValues: { hasMargin: DEFAULT_VALUE.hasMargin } });
  const [modalData, setModalData] = useState<{ id: number; value: AddForm }>({ id: -1, value: DEFAULT_VALUE });
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const linkDialog = useDisclosure();

  const fetchData = async () => {
    const res = await Axios.get<{ data: Array<Content & { section: Section }> }>('/api/content');
    setData(res.data.data.sort((a, b) => a.order - b.order).sort((a, b) => a.section.order - b.section.order));
  };

  const onChangeData = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
    setBeChange(true);
  };

  const onAddClick: SubmitHandler<AddForm> = async (values) => {
    await Axios.post('/api/content', {
      title: values.title,
      subtitle: values.subtitle,
      description: values.description,
      stack: values.stack,
      section: values.section,
      order: data.length + 1,
      hasMargin: values.hasMargin
    });
    await fetchData();
    reset(DEFAULT_VALUE);
  };

  const onApplyClick = async () => {
    if (!isChange) return;
    await Axios.patch('/api/content/reorder', { ids: data.map((item) => item.id) });
    setBeChange(false);
  };

  useEffect(() => {
    fetchData()
      .then(() => Axios.get<{ data: Section[] }>('/api/section'))
      .then((res) => setSection(res.data.data));
  }, []);

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
        <VerticalGap gap={10} />
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
            placeholder="부제목 (2022 / 프론트엔드)"
            background="white"
            css={css`
              grid-column: 4 / 6;
            `}
            {...register('subtitle')}
          />
          <Input
            placeholder="스택"
            background="white"
            css={css`
              grid-column: 1 / 3;
            `}
            {...register('stack')}
          />
          <Select
            placeholder="섹션"
            background="white"
            css={css`
              grid-column: 3 / 4;
            `}
            {...register('section', { required: true })}
          >
            <SectionOptions />
          </Select>
          <Checkbox
            css={css`
              grid-column: 4 / 5;
            `}
            {...register('hasMargin')}
          >
            간격 추가
          </Checkbox>
          <Textarea
            placeholder="내용"
            background="white"
            css={css`
              grid-column: 1 / 6;
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
        <VerticalGap gap={20} />
        <DraggableTable
          useLinkControl
          data={data}
          columns={[
            { key: 'id', label: '#' },
            { key: 'title', label: '제목' },
            { key: 'section', label: '섹션', render: (item) => <Td>{item.section.title}</Td> },
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
                stack: item.stack,
                section: String(item.section.id),
                hasMargin: item.hasMargin
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
                stack: item.stack,
                section: String(item.section.id),
                hasMargin: item.hasMargin
              }
            });
            deleteDialog.onOpen();
          }}
          onTableLinkClick={(item) => {
            setModalData((prev) => ({ ...prev, id: item.id }));
            linkDialog.onOpen();
          }}
        />
        <VerticalGap gap={10} />
        <Footer>
          <Button colorScheme="green" fontWeight="normal" onClick={() => fetchData().then(() => setBeChange(false))}>
            새로고침
          </Button>
          <HorizontalGap gap={10} />
          <Button disabled={!isChange} colorScheme="blue" fontWeight="normal" onClick={onApplyClick}>
            적용
          </Button>
        </Footer>
      </AdminLayout>

      <DeleteModal
        title="컨텐츠 삭제하기"
        modalController={deleteDialog}
        onDeleteClick={async () => {
          await Axios.delete(`/api/content/${modalData.id}`);
          await fetchData();
          deleteDialog.onClose();
        }}
      >
        컨텐츠 삭제 시 링크와 함께 삭제됩니다.
      </DeleteModal>
      <UpdateModal
        modalController={updateDialog}
        fields={[
          { id: 'title', label: '제목', component: Input },
          { id: 'subtitle', label: '부제목', component: Input },
          { id: 'description', label: '내용', component: Textarea },
          { id: 'stack', label: '스택', component: Input },
          { id: 'section', label: '섹션', component: Select, option: <SectionOptions /> },
          { id: 'hasMargin', label: '간격 추가', component: Checkbox }
        ]}
        defaultValue={[
          modalData.value.title,
          modalData.value.subtitle,
          modalData.value.description,
          modalData.value.stack,
          modalData.value.section,
          modalData.value.hasMargin
        ]}
        onUpdateClick={async (values) => {
          await Axios.patch(`/api/content/${modalData.id}`, {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            stack: values.stack,
            section: values.section,
            hasMargin: values.hasMargin
          });
          await fetchData();
          updateDialog.onClose();
        }}
      />
      <LinkModal modalController={linkDialog} dataId={modalData.id} />
    </>
  );
};

export default AdminContent;
