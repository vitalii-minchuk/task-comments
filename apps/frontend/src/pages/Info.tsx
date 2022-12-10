import { Box, Button, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

import {
  useDeleteDataMutation,
  useGenerateFakeDataMutation,
} from '../apollo/generated/schema';
import { infoButtonsVariants, infoText } from '../constants';
import makeToast, { ToastStatus } from '../helpers/make-toast';

function Info() {
  const [text] = useTypewriter({
    words: infoText,
    loop: true,
    delaySpeed: 700,
  });
  const toast = useToast();

  const [generateFakeData, { error: generateError }] =
    useGenerateFakeDataMutation({
      onCompleted() {
        toast(
          makeToast({
            description: 'Data has been generated',
            title: 'Generate data',
            status: ToastStatus.SUCCESS,
          })
        );
      },
      onError() {
        toast(
          makeToast({
            description:
              generateError?.message ||
              'Access denied! You need to be authorized to perform this action!',
            title: 'Generate data',
            status: ToastStatus.ERROR,
          })
        );
      },
    });

  const [deleteData, { error: deleteError }] = useDeleteDataMutation({
    onCompleted() {
      toast(
        makeToast({
          description: 'Data has been deleted',
          title: 'Delete data',
          status: ToastStatus.SUCCESS,
        })
      );
    },
    onError() {
      toast(
        makeToast({
          description:
            deleteError?.message ||
            'Access denied! You need to be authorized to perform this action!',
          title: 'Delete data',
          status: ToastStatus.ERROR,
        })
      );
    },
  });

  return (
    <Box w="full" py="70px">
      <Container maxWidth="4xl">
        <Flex
          mb="40px"
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={infoButtonsVariants}
          gap={4}
        >
          <Button variant="myNormal" onClick={() => generateFakeData()}>
            generate data
          </Button>
          <Button variant="myNormal" onClick={() => deleteData()}>
            delete data
          </Button>
        </Flex>
        <Box w={3 / 4}>
          <Text fontSize="lg">
            <span>{text}</span>
            <Cursor cursorColor="#7928CA" />
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Info;
