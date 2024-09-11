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
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';

import { RiArrowRightLine } from '@remixicon/react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import { SchemaType } from '../../types/type-util';
import { useSupabase } from '../../utils/supabase';
import { Space } from '../Space';
import Colors from '../../styles/Colors';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 10px;
  background-color: white;
`;

const StyledFileInput = styled(Input)`
  padding-top: 5px;
`;

const DropzoneContainer = styled.div`
  display: flex;
  touch-action: none;
  width: 100%;
  height: 100%;
`;

const StyledDropzone = styled(GridDropZone)`
  flex: 1;
  height: 300px;
`;

const StyledImage = styled.img`
  width: auto;
  height: 90px;

  object-fit: cover;
  user-select: none;
  cursor: pointer;
  border: 1px solid ${Colors.GRAY};

  margin-right: 10px;

  &:hover {
    outline: 1px solid ${Colors.PRIMARY};
  }
`;

const HintText = styled.p`
  font-size: 14px;
  color: ${Colors.GRAY_DARKEN};
  margin: 4px 0;
`;

interface AddForm {
  readonly id: number;
  readonly file: File[];
  readonly alt: string;
}

interface LinkModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly dataId: number;
}

const ImageModal: React.FC<LinkModalProps> = ({ modalController, dataId }) => {
  const [data, setData] = useState<SchemaType<'images'>[]>([]);
  const { isOpen, onClose } = modalController;
  const { register, handleSubmit, reset } = useForm<AddForm>();
  const supabase = useSupabase();
  const toast = useToast({
    isClosable: true,
    position: 'top-left'
  });

  const fetchData = async (id: number) => {
    if (id > 0) {
      const { data: contents, error } = await supabase.from('contents').select('*, images(*)').match({ id });
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
        setData(content.images.sort((a, b) => a.order - b.order));
      }
    }
  };

  const onChangeData = (sourceId: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(data, sourceIndex, targetIndex);
    setData(nextState);
  };

  const onAddClick: SubmitHandler<AddForm> = async ({ file, alt }) => {
    const filePath = `${+new Date()}-${file[0].name}`;
    const { error } = await supabase.storage.from('images').upload(filePath, file[0]);
    if (error !== null) {
      toast({
        title: 'Storage Error',
        description: error?.message ?? 'Unknown Error',
        status: 'error'
      });
      return;
    }
    const urlResult = supabase.storage.from('images').getPublicUrl(filePath);

    const nextOrder = data ? data.length + 1 : 1;
    await supabase.from('images').insert({
      image_url: urlResult.data.publicUrl,
      alt,
      order: nextOrder,
      contentId: dataId
    });
    await fetchData(dataId);
    reset({ file: [], alt: '' });
  };

  const onDeleteClick = async (id: number) => {
    const { data: rawImages } = await supabase.from('images').select('*').match({ id });
    if (rawImages === null) return;
    const image = rawImages[0];
    const imageUrl = image.image_url.split('/images/')[1];
    await supabase.from('images').delete().match({ id });
    await supabase.storage.from('images').remove([imageUrl]);
    await fetchData(dataId);
  };

  const onApplyClick = async () => {
    if (data.length > 0) {
      const promisedOrder = data.map(async ({ id }, index) => {
        await supabase
          .from('images')
          .update({ order: index + 1 })
          .match({ id });
      });
      await Promise.all(promisedOrder);
    }
    onClose();
  };

  useEffect(() => {
    fetchData(dataId).then();
  }, [dataId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>컨텐츠 이미지</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputContainer>
            <StyledFileInput type="file" {...register('file', { required: true })} />
            <Input type="text" placeholder="대체 텍스트" width={220} {...register('alt', { required: true })} />
            <IconButton
              colorScheme="blue"
              aria-label="이미지 추가"
              icon={<RiArrowRightLine size={20} />}
              onClick={handleSubmit(onAddClick)}
            />
          </InputContainer>
          <HintText>* 이미지를 우클릭하면 해당 이미지를 영구 삭제합니다.</HintText>
          <Space y={10} />
          <Divider />
          <Space y={10} />
          <GridContextProvider onChange={onChangeData}>
            <DropzoneContainer>
              <StyledDropzone id="images" boxesPerRow={3} rowHeight={100} disableDrag={false} disableDrop={false}>
                {data.map((image) => (
                  <GridItem
                    key={image.id}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onDeleteClick(image.id);
                    }}
                  >
                    <StyledImage src={image.image_url} alt={image.alt} onDragStart={(e) => e.preventDefault()} />
                  </GridItem>
                ))}
              </StyledDropzone>
            </DropzoneContainer>
          </GridContextProvider>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} fontWeight="normal" onClick={onApplyClick}>
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

export default ImageModal;
