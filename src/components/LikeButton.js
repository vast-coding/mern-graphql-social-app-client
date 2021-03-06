import { Button, Icon, Label, Loader } from 'semantic-ui-react'
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

const ButtonContents = ({ likeCount, isLiked, isLoading }) => (
  <>
    <Button as="div" color="teal" basic={!isLiked}>
      {!isLoading ? (
        <Icon name="heart" />
      ) : (
        <Loader
          active
          inline="centered"
          size="mini"
          style={{ display: 'inline-block' }}
        />
      )}
    </Button>
    <Label basic color="teal" pointing="left">
      {likeCount}
    </Label>
  </>
)

export const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    const userLikesThisPost = Boolean(
      user && likes.find((like) => like.username === user.username)
    )

    setLiked(userLikesThisPost)
  }, [user, likes])
  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted: () => {
      // console.log('LIKE_POST completed')
    },
  })

  const toolTipMessage = liked ? 'Unlike post' : 'Like post'
  const as = user ? 'div' : Link
  const to = user ? null : '/Login'
  const handler = user ? likePost : null

  return (
    <MyPopup content={toolTipMessage}>
      <Button as={as} to={to} onClick={handler} labelPosition="right">
        <ButtonContents
          likeCount={likeCount}
          isLiked={liked}
          isLoading={loading}
        />
      </Button>
    </MyPopup>
  )
}
