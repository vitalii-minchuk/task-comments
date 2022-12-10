import { ChangeEvent, useEffect, useState } from 'react';
import { AddIcon, ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {
  Post,
  useCreatePostMutation,
  useGetPostsQuery,
} from '../../apollo/generated/schema';
import { postsHeadingVariants, TAKE_25 } from '../../constants';
import makeToast, { ToastStatus } from '../../helpers/make-toast';
import {
  AddCommentAndPostTitleEnum,
  MessageType,
  OrderByType,
  OrderTypeType,
  SortPostOptionsType,
} from '../../types';
import AddCommentAndPostModal from './modal';
import SinglePost from './post';

function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [current, setCurrent] = useState(0);

  const [sortOptions, setSortOptions] = useState<SortPostOptionsType>({
    orderBy: OrderByType.DATE,
    orderType: OrderTypeType.DESC,
  });

  const { data, refetch: refetchPosts } = useGetPostsQuery({
    // fetchPolicy: 'network-only',
    refetchWritePolicy: 'merge',
    variables: {
      posts: {
        take: TAKE_25,
        skip: current * TAKE_25,
        orderType: sortOptions.orderType,
        orderBy: sortOptions.orderBy,
      },
    },
  });

  const posts = data?.getAllPosts;
  const total = data?.getAllPosts[0]?.total;

  const changePageHandler = (page: number) => {
    setCurrent(page - 1);
  };

  const [createNewPost, { error }] = useCreatePostMutation({
    onCompleted() {
      refetchPosts();
    },
  });

  const createMessageHandler = ({ message, picture }: MessageType) => {
    createNewPost({
      variables: {
        input: {
          text: message,
          image_url: picture,
        },
      },
    });
  };

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Create post',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

  const sortByTypeHandler = () => {
    if (sortOptions.orderType === OrderTypeType.DESC) {
      setSortOptions({ ...sortOptions, orderType: OrderTypeType.ASC });

      return;
    }
    setSortOptions({ ...sortOptions, orderType: OrderTypeType.DESC });
  };

  const sortByHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOptions({ ...sortOptions, orderBy: e.target.value as OrderByType });
  };

  useEffect(() => {
    refetchPosts();
  }, [refetchPosts, sortOptions]);

  return (
    <>
      <Box pt="70px">
        <Flex
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={postsHeadingVariants}
          flexDirection={{ base: 'column', sm: 'row' }}
          justify="space-between"
          mb={10}
          gap={4}
        >
          <Button rightIcon={<AddIcon />} variant="myNormal" onClick={onOpen}>
            Add post
          </Button>
          <Flex align="center" gap={2}>
            <Text whiteSpace="nowrap">order by:</Text>
            <Select
              cursor="pointer"
              borderColor="#7928CA"
              variant="flushed"
              onChange={sortByHandler}
            >
              <option value={OrderByType.DATE}>{OrderByType.DATE}</option>
              <option value={OrderByType.EMAIL}>{OrderByType.EMAIL}</option>
              <option value={OrderByType.USERNAME}>
                {OrderByType.USERNAME}
              </option>
            </Select>
            <Button
              _hover={{ bg: 'gray.800' }}
              variant="text"
              onClick={sortByTypeHandler}
            >
              {sortOptions.orderType === OrderTypeType.DESC ? (
                <ArrowUpIcon />
              ) : (
                <ArrowDownIcon />
              )}
            </Button>
          </Flex>
        </Flex>
        <Box>
          <Stack gap={3}>
            {posts?.map((post) => (
              <SinglePost key={post.id} post={post as Post} />
            ))}
          </Stack>
          {total && TAKE_25 < total && (
            <Pagination
              onChange={changePageHandler}
              current={current + 1}
              pageSize={TAKE_25}
              className="ant-pagination"
              total={total}
            />
          )}
        </Box>
      </Box>
      <AddCommentAndPostModal
        title={AddCommentAndPostTitleEnum.Post}
        createMessageHandler={createMessageHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Posts;
