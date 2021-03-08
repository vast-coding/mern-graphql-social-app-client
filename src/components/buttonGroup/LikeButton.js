import { Button, Icon, Label, Loader } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { MyPopup } from '../MyPopup'

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

// styling is to match existing heart icon
const Spinner = () => (
  <Loader
    active
    inline="centered"
    size="mini"
    style={{
      display: 'inline-block',
      height: '12px',
      marginTop: '-3px',
      width: '16.5px',
      marginLeft: '-3px',
      marginRight: '6px',
    }}
  />
)

const ButtonContents = ({ likeCount, isLiked, isLoading }) => (
  <>
    <Button as="div" color="teal" basic={!isLiked}>
      {isLoading ? <Spinner /> : <Icon name="heart" />}
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
  let as = Link
  let to = '/Login'
  let handler = null

  if (user) {
    as = 'div'
    to = 'null'
    handler = likePost
  }

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
