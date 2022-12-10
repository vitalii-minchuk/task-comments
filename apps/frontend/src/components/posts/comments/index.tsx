import { Box } from '@chakra-ui/react';

import { Comment, Post } from '../../../apollo/generated/schema';
import formatComments from '../../../helpers/format-coments';
import ListComments from './ListComments';

interface ICommentsSectionProps {
  postId: Post['id'];
  comments: Array<Comment>;
  refetchComments: () => void;
}

function CommentsSection({
  postId,
  comments,
  refetchComments,
}: ICommentsSectionProps) {
  return (
    <Box>
      {comments && (
        <ListComments
          refetchComments={refetchComments}
          postId={postId}
          comments={formatComments(comments || [])}
        />
      )}
    </Box>
  );
}

export default CommentsSection;
