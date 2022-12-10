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

import { useRegisterUserMutation } from '../apollo/generated/schema';
import makeToast, { ToastStatus } from '../helpers/make-toast';
import {
  registerUserValidationSchema,
  UserSubmitRegisterForm,
} from '../validation';
import { loginVariants } from '../constants';

function Register() {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitRegisterForm>({
    mode: 'onTouched',
    resolver: yupResolver(registerUserValidationSchema),
  });

  const [registerUser, { loading, error }] = useRegisterUserMutation({
    onCompleted() {
      navigate('/login');
      reset();
      toast(
        makeToast({
          description: 'User has been registered',
          title: 'Register user',
          status: ToastStatus.SUCCESS,
        })
      );
    },
  });

  const submitHandler = (data: UserSubmitRegisterForm) => {
    registerUser({
      variables: {
        input: {
          password: data.password,
          email: data.email,
          username: data.username,
        },
      },
    });
  };

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Register user',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);
  return (
    <Center w="full" pt="70px" pb="20px">
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
          <Stack gap={2}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel pl={3}>User name</FormLabel>
              <Input
                bg="transparent"
                border="1px solid"
                borderColor="gray.500"
                rounded="lg"
                _focus={{
                  border: '1px solid #7928CA',
                }}
                id="username"
                {...register('username')}
                type="text"
              />
              <FormErrorMessage pl={3}>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
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
                {...register('email')}
                type="email"
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
            <FormControl isInvalid={!!errors.homePageUrl}>
              <FormLabel pl={3}>Home page url</FormLabel>
              <Input
                bg="transparent"
                border="1px solid"
                borderColor="gray.500"
                rounded="lg"
                _focus={{
                  border: '1px solid #7928CA',
                }}
                id="homePageUrl"
                {...register('homePageUrl')}
                type="text"
              />
              <FormErrorMessage pl={3}>
                {errors.homePageUrl && errors.homePageUrl.message}
              </FormErrorMessage>
            </FormControl>
            <Spacer h="20px" />
            <Button variant="mySubmit" type="submit" isLoading={loading}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Register;
