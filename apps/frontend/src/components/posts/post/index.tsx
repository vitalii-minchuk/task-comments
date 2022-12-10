import { memo, useEffect, useState } from 'react';
import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Image,
  Text,
  useDisclosure,
  useToast,
  Collapse,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import moment from 'moment';

import {
  Post,
  useCreateNewCommentMutation,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import makeToast, { ToastStatus } from '../../../helpers/make-toast';
import { AddCommentAndPostTitleEnum, MessageType } from '../../../types';
import AddCommentAndPostModal from '../modal';
import CommentsSection from '../comments';
import { CommentWithChildren } from '../../../helpers/format-coments';
import checkText from '../../../helpers/fake-text-cheker';
import { postVariants } from '../../../constants';

interface IPostProps {
  post: Post;
}

function SinglePost({ post }: IPostProps) {
  const [isShowComments, setIsShowComments] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, refetch: refetchComments } = useGetAllPostCommentsQuery({
    refetchWritePolicy: 'merge',
    variables: {
      input: {
        postId: post.id,
      },
    },
  });

  const [createNewComment, { error }] = useCreateNewCommentMutation({
    onCompleted() {
      setIsShowComments(true);
      refetchComments();
    },
  });

  const createMessageHandler = ({ message, picture }: MessageType) => {
    createNewComment({
      variables: {
        input: {
          text: message,
          image_url: picture,
          postId: post.id,
        },
      },
    });
  };

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Create comment',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

  return (
    <>
      <Box
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={postVariants}
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
              src={post.user.avatar || ''}
            />
            <Text
              fontWeight="bold"
              fontSize="xl"
              bgClip="text"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
            >
              {post.user.username}
            </Text>
            <Text opacity={0.7} display={{ base: 'none', sm: 'flex' }}>
              {post.user.email}
            </Text>
          </Flex>
          <Text fontSize="xs">
            {moment(new Date(post?.createdAt)).fromNow()}
          </Text>
        </Flex>
        <Stack gap={8} py={6} px={4} bgGradient="radial(black, gray.700)">
          {checkText(post.text) ? parse(post.text) : <Text>{post.text}</Text>}
          {post.image_url && (
            <Image
              alignSelf="center"
              rounded="lg"
              w={{ base: '200px', sm: '320px' }}
              maxHeight="240px"
              objectFit="cover"
              src={post.image_url}
              alt="some img"
            />
          )}
          <Flex alignSelf="end" gap={4}>
            <Button
              w={{ base: 'full', sm: '180px' }}
              rightIcon={<AddIcon />}
              variant="myNormal"
              onClick={onOpen}
            >
              add comment
            </Button>
            {!!data?.getAllPostComments.length && (
              <Button
                _hover={{
                  bg: 'black',
                }}
                variant="text"
                onClick={() => setIsShowComments(!isShowComments)}
              >
                {isShowComments ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            )}
          </Flex>
        </Stack>
      </Box>
      <Collapse startingHeight={3} in={isShowComments} animateOpacity>
        <CommentsSection
          refetchComments={refetchComments}
          comments={data?.getAllPostComments as Array<CommentWithChildren>}
          postId={post.id}
        />
      </Collapse>
      <AddCommentAndPostModal
        title={AddCommentAndPostTitleEnum.Comment}
        createMessageHandler={createMessageHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default memo(SinglePost);
