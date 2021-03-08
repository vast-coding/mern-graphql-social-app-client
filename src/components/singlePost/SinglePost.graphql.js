import { gql } from '@apollo/client'

// postId should be ID!
export const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      commentCount
      id
      comments {
        body
        createdAt
        id
        username
      }
    }
  }
`

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      body
      commentCount
      createdAt
      id
      likeCount
      username
      comments {
        body
        createdAt
        id
        username
      }
      likes {
        username
      }
    }
  }
`
