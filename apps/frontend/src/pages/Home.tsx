import { Box, Container } from '@chakra-ui/react';

import Posts from '../components/posts';

function Home() {
  return (
    <Box w="full">
      <Container maxWidth="4xl">
        <Posts />
      </Container>
    </Box>
  );
}

export default Home;
