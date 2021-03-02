import { Button, Confirm, Icon, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { useState } from 'react'

const MyPopup = ({ content, children }) => (
  <Popup inverted content={content} trigger={children} />
)

export const DeleteButton = ({ postId, commentId, redirect }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const closeConfirmModal = () => setConfirmOpen(false)
  const openConfirmModal = () => setConfirmOpen(true)
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deleteSomething] = useMutation(mutation, {
    update(cache) {
      closeConfirmModal()
      if (!commentId) {
        const { getPosts: posts } = cache.readQuery({
          query: FETCH_POSTS_QUERY,
        })
        const newPosts = posts.filter(({ id }) => id !== postId)
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: [...newPosts] },
        })
      }
      if (redirect) {
        redirect()
      }
    },
    // commentId is undefined and ignored during DELETE_POST_MUTATION
    variables: { postId, commentId },
    onError(err) {
      console.log({ err })
    },
  })

  const popupMessage = commentId ? 'Delete comment' : 'Delete Post'

  return (
    <>
      <MyPopup content={popupMessage}>
        <Button as="div" color="red" floated="right" onClick={openConfirmModal}>
          <Icon style={{ margin: 0 }} name="trash" />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={closeConfirmModal}
        onConfirm={deleteSomething}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

// `$postId: String!` should be changed to `$postId: ID!` FE and BE
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        body
        createdAt
        id
        username
      }
      commentCount
    }
  }
`
