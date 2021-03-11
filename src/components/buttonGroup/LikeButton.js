import { Button, Icon, Label } from 'semantic-ui-react'
import { useEffect, useState } from 'react'

import { ButtonSpinner } from './ButtonSpinner'
import { Link } from 'react-router-dom'
import { MyPopup } from '../MyPopup'
import { useLike } from './useLike'

const ButtonContents = ({ likeCount, isLiked, isLoading }) => (
  <>
    <Button as="div" color="teal" basic={!isLiked}>
      {isLoading ? <ButtonSpinner /> : <Icon name="heart" />}Like
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

  const { likePost, loading } = useLike(id)

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
      <Button
        as={as}
        to={to}
        onClick={handler}
        labelPosition="right"
        style={{ marginBottom: '5px' }}
        data-compnt="LikeButton"
      >
        <ButtonContents
          likeCount={likeCount}
          isLiked={liked}
          isLoading={loading}
        />
      </Button>
    </MyPopup>
  )
}
