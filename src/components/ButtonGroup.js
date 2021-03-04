import './buttonGroup.css'

import { Button, Card, Icon, Label } from 'semantic-ui-react'

import { DeleteButton } from './DeleteButton'
import { LikeButton } from './LikeButton'
import { Link } from 'react-router-dom'
import { MyPopup } from './MyPopup'

const CommentButtonLink = (props) => {
  const { postId, commentCount, ...rest } = props
  return (
    <Button {...rest} labelPosition="right" as={Link} to={`/posts/${postId}`}>
      <Button color="blue" basic>
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

const CommentButton = (props) => {
  const { handleComment, commentCount, ...rest } = props

  return (
    <Button {...rest} as="div" labelPosition="right" onClick={handleComment}>
      <Button basic color="blue">
        <Icon name="comments" />
      </Button>
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

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
  const CommentBtn = (props) => (
    <MyPopup content="Comment on Post">
      {handleComment ? (
        <CommentButton
          {...props}
          handleComment={handleComment}
          commentCount={commentCount}
        />
      ) : (
        <CommentButtonLink {...props} postId={id} commentCount={commentCount} />
      )}
    </MyPopup>
  )

  return (
    <Card.Content className="buttonGroup" extra>
      <LikeButton
        className="LikeButton"
        user={user}
        post={{ id, likeCount, likes }}
      />
      <CommentBtn />
      {isPostAuthor && (
        <DeleteButton postId={id} redirect={deletePostCallback} />
      )}
    </Card.Content>
  )
}
