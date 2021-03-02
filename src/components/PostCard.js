import { AuthContext } from '../context/auth'
import { ButtonGroup } from './ButtonGroup'
import { Card } from 'semantic-ui-react'
import { PostHeader } from './PostHeader'
import { useContext } from 'react'

export const PostCard = ({ post }) => {
  const { body, commentCount, createdAt, id, likeCount, likes, username } = post
  const { user } = useContext(AuthContext)
  const isPostAuthor = user && user.username === username

  return (
    <Card fluid>
      <PostHeader
        username={username}
        createdAt={createdAt}
        body={body}
        isUserImage={true}
      />
      <ButtonGroup
        commentCount={commentCount}
        deletePostCallback={() => {}}
        handleComment={false}
        id={id}
        isPostAuthor={isPostAuthor}
        likeCount={likeCount}
        likes={likes}
        user={user}
      />
    </Card>
  )
}
