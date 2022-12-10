/* eslint-disable no-continue */
import { Comment } from '../apollo/generated/schema';

export type CommentWithChildren = Comment & {
  children: Array<CommentWithChildren>;
};
function formatComments(comments: Array<Comment>) {
  const arr = comments.map((comment) => ({
    ...comment,
    children: [],
  }));

  const map = new Map();

  const roots: Array<CommentWithChildren> = [];

  for (let i = 0; i < arr.length; i += 1) {
    const commentId = arr[i]?.id;

    map.set(commentId, i);

    if (typeof arr[i].parentId === 'string') {
      const parentCommentIndex: number = map.get(arr[i].parentId);

      (arr[parentCommentIndex] as CommentWithChildren)?.children?.push(
        arr[i] as CommentWithChildren
      );

      continue;
    }

    roots.push(arr[i] as CommentWithChildren);
  }

  return roots;
}
export default formatComments;
