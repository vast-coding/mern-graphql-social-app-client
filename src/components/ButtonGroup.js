import './buttonGroup.css'

import { ButtonComment } from './ButtonComment'
import { Card } from 'semantic-ui-react'
import { DeleteButton } from './DeleteButton'
import { LikeButton } from './LikeButton'

export const ButtonGroup = ({
  commentCount,
  deletePostCallback,
  handleComment,
  id,
  isPostAuthor,
  likeCount,
  likes,
  user,
}) => {
  return (
    <Card.Content className="buttonGroup" extra>
      <LikeButton
        className="LikeButton"
        user={user}
        post={{ id, likeCount, likes }}
      />
      <ButtonComment
        commentCount={commentCount}
        handleComment={handleComment}
        id={id}
      />

      {isPostAuthor && (
        <DeleteButton postId={id} redirect={deletePostCallback} />
      )}
    </Card.Content>
  )
}
