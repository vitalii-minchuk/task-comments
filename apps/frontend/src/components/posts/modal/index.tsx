import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactQuill from 'react-quill';
import { motion } from 'framer-motion';

import { AddCommentAndPostTitleEnum, MessageType } from '../../../types';
import { SubmitTextForm, textValidationSchema } from '../../../validation';
import ImageResize from '../../common/image-resize';
import 'react-quill/dist/quill.snow.css';
import './quill.css';
import { quillModulesOptions } from '../../../constants';

interface IAddCommentAndPostModalProps {
  isOpen: boolean;
  title: AddCommentAndPostTitleEnum;
  onClose: () => void;
  createMessageHandler: ({ message, picture }: MessageType) => void;
}
function AddCommentAndPostModal({
  title,
  isOpen,
  onClose,
  createMessageHandler,
}: IAddCommentAndPostModalProps) {
  const [image, setImage] = useState('');
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitTextForm>({
    mode: 'onChange',
    resolver: yupResolver(textValidationSchema),
  });

  const submitHandler = (data: SubmitTextForm) => {
    createMessageHandler({ message: data.text, picture: image });
    reset();
    onClose();
    setImage("")
  };

  useEffect(() => {
    register('text');
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('text', editorState);
  };

  const editorContent = watch('text');

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <ModalOverlay />
      <ModalContent
        as={motion.div}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        transition="0.5s linear"
        bgGradient="radial(gray.900, gray.700)"
        borderColor="transparent"
        mx={2}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody>
            <ReactQuill
              modules={quillModulesOptions}
              theme="snow"
              value={editorContent}
              onChange={onEditorStateChange}
            />
            {errors.text && (
              <Text ml={3} color="red.500">
                {errors.text.message}
              </Text>
            )}
            <ImageResize setImage={setImage} />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="myNormal"
              mr={4}
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Close
            </Button>
            <Button type="submit" variant="myAuth">
              Confirm
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddCommentAndPostModal;
