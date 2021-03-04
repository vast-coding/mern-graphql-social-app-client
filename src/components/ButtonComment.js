import { Button, Icon, Label } from 'semantic-ui-react'

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

export const ButtonComment = ({ handleComment, commentCount, id }) => {
  console.log({ CommentBtn: true, handleComment, commentCount, id })
  return (
    <MyPopup content="Comment on Post">
      {handleComment ? (
        <CommentButton
          handleComment={handleComment}
          commentCount={commentCount}
        />
      ) : (
        <CommentButtonLink postId={id} commentCount={commentCount} />
      )}
    </MyPopup>
  )
}
