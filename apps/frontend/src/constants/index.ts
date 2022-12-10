export const TAKE_25 = 25;

export const quillModulesOptions = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['clean'],
  ],
};

// animation
export const logoVariants = {
  hidden: {
    x: -100,
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const authVariants = {
  hidden: {
    x: 100,
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const postVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

export const commentVariants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const postsHeadingVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

export const infoButtonsVariants = {
  hidden: {
    x: -100,
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const loginVariants = {
  hidden: {
    scale: 0.7,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5 },
  },
};

export const infoText = [
  'To test this app you need to register first, than log in using the same email and password.',
  'Also you can generate some fake data to work with, by pressing generate data button.',
  'In order to clean all the data click delete data button',
];
