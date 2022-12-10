import { ComponentStyleConfig } from '@chakra-ui/theme';

export default {
  variants: {
    myAuth: {
      h: '34',
      rounded: 'full',
      bgGradient: 'linear(to-l, #7928CA, #FF0080)',
      _active: {
        shadow: 'none',
      },
      _hover: {
        shadow: '5px 5px 20px #7928CA',
      },
    },
    mySubmit: {
      h: '40px',
      rounded: 'md',
      bgGradient: 'linear(to-l, #7928CA, #FF0080)',
      _active: {
        shadow: 'none',
      },
      _hover: {
        shadow: '5px 5px 20px #7928CA',
      },
    },
    myNormal: {
      fontSize: '12px',
      h: '40px',
      opacity: '0.9',
      textTransform: 'uppercase',
      rounded: 'full',
      border: '1px solid #7928CA',
      _active: {
        shadow: 'none',
      },
      _hover: {
        shadow: '5px 5px 20px #7928CA',
      },
    },
    myInfo: {
      h: '34px',
      variant: 'text',
      rounded: 'full',
      _hover: {
        bg: 'gray.800',
        outline: '1px solid #7928CA',
      },
    },
  },
} as ComponentStyleConfig;
