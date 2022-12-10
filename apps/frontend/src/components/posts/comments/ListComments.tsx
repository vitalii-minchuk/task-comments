/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Avatar,
  Box,
  Button,
  Text,
  Flex,
  Image,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import moment from 'moment';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

import {
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import { CommentWithChildren } from '../../../helpers/format-coments';
import { AddCommentAndPostTitleEnum, MessageType } from '../../../types';
import AddCommentAndPostModal from '../modal';
import checkText from '../../../helpers/fake-text-cheker';
import { commentVariants } from '../../../constants';

interface ICommentProps {
  refetchComments: () => void;
  comment: CommentWithChildren;
  postId: Post['id'];
}

function SingleComment({ comment, postId, refetchComments }: ICommentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createNewComment] = useCreateNewCommentMutation({
    onCompleted() {
      refetchComments();
    },
  });

  const createMessageHandler = ({ message, picture }: MessageType) => {
    createNewComment({
      variables: {
        input: {
          text: message,
          image_url: picture,
          postId,
          parentId: comment.id,
        },
      },
    });
  };

  return (
    <>
      <Box
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        variants={commentVariants}
        boxShadow="2px 2px 10px #7928CA"
        border="1px solid"
        borderColor="gray.700"
        rounded="lg"
      >
        <Flex align="center" justify="space-between" p={4} bg="transparent">
          <Flex align="center" gap={4}>
            <Avatar
              boxShadow="2px 2px 10px #7928CA"
              size={{ base: 'sm', md: 'md' }}
              src={comment.user.avatar || ''}
            />
            <Text
              fontWeight="bold"
              fontSize="xl"
              bgClip="text"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
            >
              {comment.user.username}
            </Text>
            <Text opacity={0.7} display={{ base: 'none', sm: 'flex' }}>
              {comment.user.email}
            </Text>
          </Flex>
          <Text fontSize="xs">
            {moment(new Date(comment?.createdAt)).fromNow()}
          </Text>
        </Flex>
        <Stack gap={8} py={6} px={4} bgGradient="radial(black, gray.700)">
          {checkText(comment.text) ? (
            parse(comment.text)
          ) : (
            <Text>{comment.text}</Text>
          )}
          {comment.image_url && (
            <Image
              alignSelf="center"
              rounded="lg"
              w={{ base: '200px', sm: '320px' }}
              maxHeight="240px"
              objectFit="cover"
              src={comment.image_url}
              alt="some img"
            />
          )}
          <Button
            alignSelf="end"
            w={{ base: 'full', sm: '180px' }}
            rightIcon={<AddIcon />}
            variant="myNormal"
            onClick={onOpen}
          >
            add comment
          </Button>
        </Stack>
      </Box>
      <ListComments
        refetchComments={refetchComments}
        postId={postId}
        comments={comment.children}
      />
      <AddCommentAndPostModal
        title={AddCommentAndPostTitleEnum.Comment}
        createMessageHandler={createMessageHandler}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}

interface IListCommentsProps {
  comments: Array<CommentWithChildren>;
  postId: Post['id'];
  refetchComments: () => void;
}

function ListComments({
  comments,
  postId,
  refetchComments,
}: IListCommentsProps) {
  return (
    <Stack
      mt={3}
      gap={3}
      borderLeft="1px solid"
      borderColor="gray.600"
      pl="15px"
    >
      {comments?.map((comment) => (
        <SingleComment
          refetchComments={refetchComments}
          key={comment.id}
          postId={postId}
          comment={comment}
        />
      ))}
    </Stack>
  );
}

export default ListComments;
