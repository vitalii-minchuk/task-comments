import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from '@chakra-ui/react';
import Resizer from 'react-image-file-resizer';

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      320,
      240,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
      50,
      50
    );
  });

interface IImageResizeProps {
  setImage: Dispatch<SetStateAction<string>>;
}
function ImageResize({ setImage }: IImageResizeProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [shownImage, setShownImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const chooseImgHandler = () => {
    inputRef.current?.click();
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    if (!event.target.files) return;

    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);

      setShownImage(image as string);

      if (file.size > 100000) {
        throw new Error(`File is too big`);
      }

      setImage(image as string);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };
  return (
    <Stack my={4} gap={4}>
      <Button onClick={chooseImgHandler} variant="myInfo" transition="all .5s">
        {shownImage ? 'change image' : 'choose image'}
      </Button>
      <Flex w="full" justify="center" gap={4}>
        {shownImage && (
          <Box h={70} w={100}>
            <img src={shownImage} alt="chosen img" />
          </Box>
        )}
        <FormControl
          isInvalid={!!errorMessage}
          w={errorMessage ? 100 : 0}
          mt="12px"
        >
          <Input
            ref={inputRef}
            display="none"
            accept="image/jpeg, image/png, image/gif"
            type="file"
            onChange={onChange}
          />
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Stack>
  );
}

export default ImageResize;
