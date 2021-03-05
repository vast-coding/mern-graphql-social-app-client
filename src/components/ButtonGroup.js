import './buttonGroup.css'

import { ButtonComment } from './ButtonComment'
import { Card } from 'semantic-ui-react'
import { DeleteButton } from './DeleteButton'
import { LikeButton } from './LikeButton'

export const ButtonGroup = ({
  commentCount,
  deletePostCallback,
  handleComment,
  postId,
  isPostAuthor,
  isSinglePostPage = false,
  likeCount,
  likes,
  user,
}) => {
  return (
    <Card.Content className="buttonGroup" extra>
      <LikeButton
        className="LikeButton"
        user={user}
        post={{ id: postId, likeCount, likes }}
      />
      <ButtonComment
        commentCount={commentCount}
        handleComment={handleComment}
        postId={postId}
        isSinglePostPage={isSinglePostPage}
      />

      {isPostAuthor && (
        <DeleteButton postId={postId} redirect={deletePostCallback} />
      )}
    </Card.Content>
  )
}
