import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '../apollo/generated/schema';
import { loginVariants } from '../constants';
import makeToast, { ToastStatus } from '../helpers/make-toast';
import { loginUserValidationSchema, UserSubmitLoginForm } from '../validation';

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitLoginForm>({
    mode: 'onTouched',
    resolver: yupResolver(loginUserValidationSchema),
  });

  const [login, { error, loading }] = useLoginMutation({
    onCompleted() {
      reset();
      navigate('/');
      toast(
        makeToast({
          description: 'User has been logged in',
          title: 'Login user',
          status: ToastStatus.SUCCESS,
        })
      );
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Login user',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

  const submitHandler = (data: UserSubmitLoginForm) => {
    login({
      variables: {
        input: { password: data.password, email: data.email },
      },
    });
  };

  return (
    <Center w="full" pt="80px">
      <Box
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={loginVariants}
        w={{ base: '300px', md: '400px' }}
        bgGradient="radial(black, gray.800)"
        px={4}
        py={8}
        boxShadow="3px 3px 15px #7928CA"
        border="1px solid"
        borderColor="gray.700"
        rounded="lg"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel pl={3}>Email</FormLabel>
              <Input
                bg="transparent"
                border="1px solid"
                borderColor="gray.500"
                rounded="lg"
                _focus={{
                  border: '1px solid #7928CA',
                }}
                id="email"
                type="email"
                {...register('email')}
              />
              <FormErrorMessage pl={3}>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel pl={3}>Password</FormLabel>
              <Input
                bg="transparent"
                border="1px solid"
                borderColor="gray.500"
                rounded="lg"
                _focus={{
                  border: '1px solid #7928CA',
                }}
                id="password"
                {...register('password')}
                type="password"
              />
              <FormErrorMessage pl={3}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Spacer h="40px" />
            <Button variant="mySubmit" type="submit" isLoading={loading}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
