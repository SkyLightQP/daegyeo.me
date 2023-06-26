import React, { useEffect, useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import VerticalGap from '../VerticalGap';
import Colors from '../../styles/Colors';
import useSupabase from '../../hooks/useSupabase';
import { SchemaType } from '../../types/type-util';

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
  const supabase = useSupabase();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = async (id: number) => {
    if (id > 0) {
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
    }
  };

  const onChangeData = (result: DropResult) => {
    if (!data) return;
    if (!result.destination) return;
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
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
  }, [dataId]);

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
              icon={<FontAwesomeIcon icon={faArrowRight} />}
              onClick={handleSubmit(onAddClick)}
            />
          </LinkRow>
          <VerticalGap gap={10} />
          <Divider />
          <VerticalGap gap={10} />
          <DragDropContext onDragEnd={onChangeData}>
            <Droppable droppableId="link-droppable">
              {(provided) => (
                <LinkList {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((link, index) => (
                    <Draggable key={link.id} draggableId={String(index)} index={index}>
                      {(innerProvided) => (
                        <LinkRow
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                        >
                          <FontAwesomeIcon icon={faBars} size="sm" color={Colors.BACKGROUND_DARK} />
                          <Input type="text" placeholder="제목" width={160} {...linkRegister(`link.${index}.name`)} />
                          <Input type="url" placeholder="링크" {...linkRegister(`link.${index}.href`)} />
                          <IconButton
                            colorScheme="red"
                            aria-label="Add Link"
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => onDeleteClick(Number(link.id))}
                          />
                        </LinkRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </LinkList>
              )}
            </Droppable>
          </DragDropContext>
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
