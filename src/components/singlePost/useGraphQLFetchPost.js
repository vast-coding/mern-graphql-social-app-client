import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from './SinglePost.graphql'
import { useMutation, useQuery } from '@apollo/client'

export const useGraphQLFetchPost = ({
  comment: body,
  clearInput: update,
  postId,
  redirectToLogin,
}) => {
  const [submitComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    update,
    // fetchPolicy: 'no-cache',
    onCompleted: () => {
      // history.push('/')
    },
    variables: {
      postId,
      body,
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

  const { data } = useQuery(FETCH_POST_QUERY, {
    update,
    variables: { postId, body },
    onError(err) {
      // needed to stop errors from blockingi UI
      console.log({ singlePost: true, func: 'fetch post', err })
    },
  })
  return { submitComment, data, loading }
}
