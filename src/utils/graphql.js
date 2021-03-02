import { gql } from '@apollo/client'

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      body
      commentCount
      createdAt
      id
      likeCount
      username
      comments {
        id
        username
        createdAt
        body
      }
      likes {
        username
      }
    }
  }
`
