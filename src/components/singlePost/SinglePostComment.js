import { Card } from 'semantic-ui-react'
import { DeleteButton } from '../DeleteButton'
import { utcToDate } from '../../utils/utcToDate'

export const SinglePostComment = ({ comment, isPostAuthor, postId }) => (
  <Card fluid key={comment.id}>
    <Card.Content>
      {isPostAuthor && <DeleteButton postId={postId} commentId={comment.id} />}
      <Card.Header>{comment.username}</Card.Header>
      <Card.Meta>{utcToDate(comment.createdAt)}</Card.Meta>
      <Card.Description>{comment.body}</Card.Description>
    </Card.Content>
  </Card>
)
