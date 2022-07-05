import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SectionUpdateAlertProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly defaultValue: string;
  readonly onUpdateClick: SubmitHandler<{ title: string; }>;
}

const SectionUpdateModal: React.FC<SectionUpdateAlertProps> = ({ modalController, defaultValue, onUpdateClick }) => {
  const { isOpen, onClose } = modalController;
  const { register, handleSubmit, setValue } = useForm<{ title: string; }>();

  useEffect(() => {
    setValue('title', defaultValue);
  }, [defaultValue]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>수정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              placeholder='제목'
              {...register('title')}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} fontWeight='normal' onClick={handleSubmit(onUpdateClick)}>
            수정
          </Button>
          <Button fontWeight='normal' onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SectionUpdateModal;
