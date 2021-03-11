import { Button, Icon, Label } from 'semantic-ui-react'

import { AuthContext } from '../../context/auth'
import { Link } from 'react-router-dom'
import { MyPopup } from '../MyPopup'
import { useContext } from 'react'

const CommentButtonLink = ({ commentCount, redirect }) => {
  return (
    <MyPopup content="Comment on Post">
      <Button labelPosition="right" as={Link} to={redirect}>
        <Button color="blue" basic>
          <Icon name="comments" />
          Post
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  )
}

const CommentButton = ({ handleComment, commentCount }) => {
  return (
    <MyPopup content="Comment on Post">
      <Button as="div" labelPosition="right" onClick={handleComment}>
        <Button basic color="blue">
          <Icon name="comments" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  )
}

export const ButtonComment = ({
  handleComment,
  commentCount,
  postId,
  isSinglePostPage,
}) => {
  const { user } = useContext(AuthContext)
  const isHomePage = !isSinglePostPage

  // On Home Page, always redirect to SinglePost Page
  if (isHomePage) {
    return (
      <CommentButtonLink
        commentCount={commentCount}
        redirect={`/posts/${postId}`}
      />
    )
  }

  // we are on SinglePostPage, not logged in
  if (!user) {
    return <CommentButtonLink commentCount={commentCount} redirect={'/login'} />
  }

  // we are on SinglePostPage, logged in
  if (user && handleComment) {
    return (
      <CommentButton
        handleComment={handleComment}
        commentCount={commentCount}
      />
    )
  }
}
