import { gql, useMutation } from '@apollo/client'

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

export const useLike = (id) => {
  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onCompleted: () => {
      // console.log('LIKE_POST completed')
    },
  })
  return { likePost, loading }
}
