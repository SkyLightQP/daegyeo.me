'use client';

import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { RiArrowRightLine, RiDeleteBin2Line, RiMenuLine } from '@remixicon/react';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Colors from '../../styles/Colors';
import { SchemaType } from '../../types/type-util';
import { Space } from '../Space';
import { createSupabaseClient } from '../../utils/supabase/client';

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 10px;
  background-color: white;
`;

interface AddForm {
  readonly id: number;
  readonly name: string;
  readonly href: string;
}

interface LinkModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly dataId: number;
}

interface LinkItemProps {
  readonly index: number;
  readonly linkId: number;
  readonly linkRegister: ReturnType<typeof useForm<{ link: AddForm[] }>>['register'];
  readonly onDeleteClick: (id: number) => void;
}

const LinkItem: FC<LinkItemProps> = ({ index, linkId, linkRegister, onDeleteClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: linkId.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <LinkRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RiMenuLine size={36} color={Colors.GRAY_DARKEN} />
      <Input type="text" placeholder="제목" width={160} {...linkRegister(`link.${index}.name`)} />
      <Input type="url" placeholder="링크" {...linkRegister(`link.${index}.href`)} />
      <IconButton
        colorScheme="red"
        aria-label="Delete Link"
        icon={<RiDeleteBin2Line size={20} />}
        onClick={() => onDeleteClick(linkId)}
      />
    </LinkRow>
  );
};

const LinkModal: React.FC<LinkModalProps> = ({ modalController, dataId }) => {
  const [data, setData] = useState<SchemaType<'links'>[]>([]);
  const { isOpen, onClose } = modalController;
  const { register, handleSubmit, reset } = useForm<AddForm>();
  const {
    control,
    register: linkRegister,
    setValue,
    handleSubmit: handleApply
  } = useForm<{ link: AddForm[] }>({ defaultValues: { link: [] } });
  const { fields } = useFieldArray({ control, name: 'link', keyName: 'uuid' });
  const supabase = createSupabaseClient();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = useCallback(
    async (id: number) => {
      if (id <= 0) return;
      const { data: contents, error } = await supabase.from('contents').select('*, links(*)').match({ id });
      if (error !== null) {
        toast({
          title: 'Database Error',
          description: error?.message ?? 'Unknown Error',
          status: 'error'
        });
        return;
      }
      if (contents !== null) {
        const content = contents[0];
        setData(content.links.sort((a, b) => a.order - b.order));
      }
    },
    [supabase]
  );

  const onChangeData = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === Number(active.id));
    const newIndex = data.findIndex((item) => item.id === Number(over.id));

    setData((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const onAddClick: SubmitHandler<AddForm> = ({ name, href }) => {
    const nextOrder = data ? data.length + 1 : 1;
    supabase
      .from('links')
      .insert({
        name,
        href,
        order: nextOrder,
        contentId: dataId
      })
      .then(() => fetchData(dataId))
      .then(() => reset({ name: '', href: '' }));
  };

  const onDeleteClick = async (id: number) => {
    await supabase.from('links').delete().match({ id });
    await fetchData(dataId);
  };

  const onApplyClick: SubmitHandler<{ link: AddForm[] }> = async ({ link }) => {
    if (data.length > 0 && link.length > 0) {
      const promisedOrder = data
        .map((item) => item.id)
        .map(async (id, index) => {
          await supabase
            .from('links')
            .update({ order: index + 1 })
            .match({ id });
        });
      const promisedUpdate = link.map(async ({ id, name, href }) => {
        await supabase.from('links').update({ name, href }).match({ id });
      });
      await Promise.all(promisedOrder);
      await Promise.all(promisedUpdate);
    }
    onClose();
  };

  useEffect(() => {
    fetchData(dataId).then();
  }, [fetchData, dataId]);

  useEffect(() => {
    if (data !== undefined) {
      const linkData = data.map(({ id, name, href }) => ({ id, name, href }));
      setValue('link', linkData);
    }
  }, [data, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>컨텐츠 링크</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LinkRow>
            <Input type="text" placeholder="제목" width={160} {...register('name', { required: true })} />
            <Input type="url" placeholder="링크" {...register('href', { required: true })} />
            <IconButton
              colorScheme="blue"
              aria-label="Add Link"
              icon={<RiArrowRightLine size={20} />}
              onClick={handleSubmit(onAddClick)}
            />
          </LinkRow>
          <Space y={10} />
          <Divider />
          <Space y={10} />
          <DndContext onDragEnd={onChangeData}>
            <SortableContext items={data.map((i) => i.id.toString())}>
              <LinkList>
                {fields.map((field, index) => (
                  <LinkItem
                    key={field.id}
                    index={index}
                    linkId={field.id}
                    linkRegister={linkRegister}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
              </LinkList>
            </SortableContext>
          </DndContext>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} fontWeight="normal" onClick={handleApply(onApplyClick)}>
            적용
          </Button>
          <Button fontWeight="normal" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LinkModal;
