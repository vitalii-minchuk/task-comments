import { UseToastOptions } from '@chakra-ui/react';

export enum ToastStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}
interface IMakeToast {
  description: string;
  status: ToastStatus.ERROR | ToastStatus.SUCCESS;
  title: string;
}
function makeToast({
  description,
  title,
  status,
}: IMakeToast): UseToastOptions {
  return {
    position: 'bottom-right',
    variant: 'solid',
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
  };
}

export default makeToast;
