import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from './SinglePost.graphql'
import { Card, Grid, Image } from 'semantic-ui-react'
import { useContext, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { ButtonGroup } from './buttonGroup'
import { PostHeader } from './PostHeader'
import { SinglePostAddComment } from './SinglePostAddComment'
import { SinglePostComment } from './SinglePostComment'

export const SinglePost = ({ match, history }) => {
  const postId = match.params.postId
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('')

  const handleComment = (event) => setComment(event.target.value)

  const handleFocusInput = () => {
    commentInputRef?.current?.focus()
  }

  const { data } = useQuery(FETCH_POST_QUERY, {
    update() {
      setComment('')
    },
    variables: { postId, body: comment },
    onError(err) {
      // needed to stop errors from blockingi UI
      console.log({ singlePost: true, func: 'fetch post', err })
    },
  })

  const getPost = data?.getPost

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('')
      commentInputRef.current.blur()
    },
    // fetchPolicy: 'no-cache',
    onCompleted: () => {
      // history.push('/')
      console.log('CREATE_COMMENT completed')
    },
    variables: {
      postId,
      body: comment,
    },
    onError(err) {
      // needed to stop errors from blockingi UI
      console.log({
        singlePost: true,
        func: 'submitComment mutation',
        err,
      })
      redirectToLogin()
    },
  })

  const redirectToHome = () => {
    history.push('/')
  }

  const redirectToLogin = () => {
    history.push('/login')
  }

  if (!getPost) {
    return <p>Loading post..</p>
  }

  const {
    body,
    commentCount,
    comments,
    createdAt,
    id,
    likeCount,
    likes,
    username,
  } = getPost

  const isPostAuthor = user && user.username === username

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            float="right"
          />
        </Grid.Column>

        <Grid.Column width={10}>
          <Card fluid>
            <PostHeader body={body} createdAt={createdAt} username={username} />
            <hr />
            <ButtonGroup
              commentCount={commentCount}
              deletePostCallback={redirectToHome}
              handleComment={handleFocusInput}
              postId={id}
              isPostAuthor={isPostAuthor}
              likeCount={likeCount}
              likes={likes}
              user={user}
              isSinglePostPage={true}
            />
          </Card>
          {user && (
            <SinglePostAddComment
              comment={comment}
              commentInputRef={commentInputRef}
              handleComment={handleComment}
              submitComment={submitComment}
            />
          )}
          {comments.map((comment) => (
            <SinglePostComment
              comment={comment}
              isPostAuthor={isPostAuthor}
              postId={id}
              key={comment.id}
            />
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
