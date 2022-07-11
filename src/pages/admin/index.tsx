import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { DropResult } from 'react-beautiful-dnd';
import { SubmitHandler, useForm } from 'react-hook-form';
import useUserVerify from '../../hooks/useUserVerify';
import Navigation from '../../components/Navigation';
import { HugeTitle } from '../../components/Typography';
import Colors from '../../styles/Colors';
import VerticalGap from '../../components/VerticalGap';
import Axios from '../../api';
import Section from '../../database/entity/Section';
import HorizontalGap from '../../components/HorizontalGap';
import DraggableTable from '../../components/DraggableTable';
import DeleteModal from '../../components/Dialogs/DeleteModal';
import UpdateModal from '../../components/Dialogs/UpdateModal';

const Container = styled.div`
  color: ${Colors.PRIMARY};

  max-width: 960px;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    max-width: 360px;
  }
`;

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
  const [data, setData] = useState<Section[]>([]);
  const [isChange, setBeChange] = useState(false);
  const [modalData, setModalData] = useState<{ id: number; title: string; }>({ id: -1, title: '' });
  const { register, handleSubmit, reset } = useForm<{ title: string; }>();
  const deleteDialog = useDisclosure();
  const updateDialog = useDisclosure();

  const fetchData = async () => {
    const res = await Axios.get<{ data: Section[] }>('/api/section');
    setData(res.data.data.sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const onAddClick: SubmitHandler<{ title: string; }> = async (values) => {
    if (values.title.trim() === '') return;
    await Axios.post('/api/section', {
      title: values.title,
      order: data.length + 1
    });
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
    await Axios.patch('/api/section/reorder', { ids: data.map((item) => item.id) });
    setBeChange(false);
  };

  return (
    <>
      <Navigation />
      <VerticalGap gap={30} />
      <Container>
        <HugeTitle>섹션 관리</HugeTitle>
        <VerticalGap gap={10} />
        <Header>
          <Input
            placeholder='섹션 이름'
            background='white'
            {...register('title')}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit(onAddClick)();
            }}
          />
          <Button colorScheme='blue' fontWeight='normal' onClick={handleSubmit(onAddClick)}>섹션 추가</Button>
        </Header>
        <VerticalGap gap={10} />
        <DraggableTable
          data={data}
          columns={[
            { key: 'id', label: '#' },
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
        <VerticalGap gap={10} />
        <Footer>
          <Button
            colorScheme='green'
            fontWeight='normal'
            onClick={() => fetchData().then(() => setBeChange(false))}
          >새로고침
          </Button>
          <HorizontalGap gap={10} />
          <Button disabled={!isChange} colorScheme='blue' fontWeight='normal' onClick={onApplyClick}>적용</Button>
        </Footer>
      </Container>

      <DeleteModal
        title='섹션 삭제하기'
        modalController={deleteDialog}
        onDeleteClick={async () => {
          await Axios.delete(`/api/section/${modalData.id}`);
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
          await Axios.patch(`/api/section/${modalData.id}`, {
            title: values.title
          });
          await fetchData();
          updateDialog.onClose();
        }}
      />
    </>
  );
};

export default Admin;
