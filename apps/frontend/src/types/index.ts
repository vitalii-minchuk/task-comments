export enum OrderTypeType {
  ASC = 'asc',
  DESC = 'desc',
}

export enum OrderByType {
  USERNAME = 'username',
  DATE = 'createdAt',
  EMAIL = 'email',
}

export type SortPostOptionsType = {
  orderType: OrderTypeType;
  orderBy: OrderByType;
};

export type MessageType = {
  message: string;
  picture?: string;
};

export enum AddCommentAndPostTitleEnum {
  Post = 'Post',
  Comment = 'Comment',
}
