import React, { Fragment, useEffect } from 'react';
import {
  Button,
  ComponentWithAs,
  FormControl,
  FormLabel,
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
import VerticalGap from '../VerticalGap';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface FieldType {
  readonly id: string;
  readonly label: string;
  readonly component: ComponentWithAs<any>;
  readonly option?: JSX.Element;
}

interface UpdateModalProps {
  readonly modalController: ReturnType<typeof useDisclosure>;
  readonly fields: FieldType[];
  readonly defaultValue: any[];
  readonly onUpdateClick: SubmitHandler<Record<string, any>>;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ modalController, fields, defaultValue, onUpdateClick }) => {
  const { isOpen, onClose } = modalController;
  const { register, handleSubmit, setValue } = useForm<Record<string, string>>();

  useEffect(() => {
    fields
      .map(({ id }) => id)
      .forEach((i, index) => {
        setValue(i, defaultValue[index]);
      });
  }, [setValue, fields, defaultValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>수정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            {fields.map(({ id, label, component: Component, option }) => (
              <Fragment key={id}>
                <FormLabel htmlFor={id}>{label}</FormLabel>
                <Component id={id} placeholder={label} {...register(id)}>
                  {option && option}
                </Component>
                <VerticalGap gap={10} />
              </Fragment>
            ))}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} fontWeight="normal" onClick={handleSubmit(onUpdateClick)}>
            수정
          </Button>
          <Button fontWeight="normal" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
