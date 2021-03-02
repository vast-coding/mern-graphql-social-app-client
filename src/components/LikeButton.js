import { Button, Icon, Label, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { MyPopup } from './MyPopup'

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

const AuthLikedButton = ({ likePost, likeCount, likeMessage }) => (
  <MyPopup content={likeMessage}>
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button as="div" color="teal">
        <Icon name="heart" />
      </Button>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  </MyPopup>
)

const AuthUnLikedButton = ({ likePost, likeCount, likeMessage }) => (
  <MyPopup content={likeMessage}>
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button as="div" color="teal" basic>
        <Icon name="heart" />
      </Button>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  </MyPopup>
)

const UserNotLoggedInButton = ({ likeCount, likeMessage }) => (
  <MyPopup content={likeMessage}>
    <Button as={Link} to="/login" labelPosition="right">
      <Button as="div" color="teal" basic>
        <Icon name="heart" />
      </Button>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  </MyPopup>
)

export const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted: () => {
      console.log('LIKE_POST completed')
    },
  })

  const likeMessage = liked ? 'Unlike post' : 'Like post'

  if (user && liked) {
    return (
      <AuthLikedButton
        likePost={likePost}
        likeCount={likeCount}
        likeMessage={likeMessage}
      />
    )
  }

  if (user && !liked) {
    return (
      <AuthUnLikedButton
        likePost={likePost}
        likeCount={likeCount}
        likeMessage={likeMessage}
      />
    )
  }

  return (
    <UserNotLoggedInButton likeCount={likeCount} likeMessage={likeMessage} />
  )
}
