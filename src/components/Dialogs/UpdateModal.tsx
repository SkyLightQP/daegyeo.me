'use client';

import React, { Fragment, useEffect, useRef } from 'react';
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
import { Space } from '../Space';

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
  const isFirstOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !isFirstOpen.current) {
      fields
        .map(({ id }) => id)
        .forEach((i, index) => {
          setValue(i, defaultValue[index]);
        });
      isFirstOpen.current = true;
    }
  }, [isOpen, isFirstOpen, setValue, fields, defaultValue]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        isFirstOpen.current = false;
      }}
      isCentered
      size="2xl"
    >
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
                <Space y={10} />
              </Fragment>
            ))}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            fontWeight="normal"
            onClick={() => {
              handleSubmit(onUpdateClick)();
              isFirstOpen.current = false;
            }}
          >
            수정
          </Button>
          <Button
            fontWeight="normal"
            onClick={() => {
              onClose();
              isFirstOpen.current = false;
            }}
          >
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
