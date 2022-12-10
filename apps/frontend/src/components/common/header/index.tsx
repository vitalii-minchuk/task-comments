import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { authVariants, logoVariants } from '../../../constants';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box as="header" w="full" shadow="2px 1px 10px #7928CA">
      <Container maxWidth="4xl" position="relative">
        <Flex
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          align="center"
          justify="space-between"
          h="60px"
        >
          <Heading
            as={motion.div}
            variants={logoVariants}
            cursor="pointer"
            onClick={() => navigate('')}
          >
            Logo
          </Heading>
          <Flex as={motion.div} variants={authVariants} gap="10px">
            <Button variant="myAuth" onClick={() => navigate('/login')}>
              sign in
            </Button>
            <Button variant="myAuth" onClick={() => navigate('/register')}>
              sign up
            </Button>
          </Flex>
        </Flex>
        <Box position="absolute" right="16px" bottom="-50px">
          {pathname === '/info' ? (
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="myInfo"
              onClick={() => navigate(-1)}
            >
              back
            </Button>
          ) : (
            <Button
              variant="myInfo"
              rightIcon={<QuestionOutlineIcon />}
              onClick={() => navigate('/info')}
            >
              info
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
