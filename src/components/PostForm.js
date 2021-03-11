import { Button, Form, Icon } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { ButtonSpinner } from './buttonGroup/ButtonSpinner'
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { useForm } from '../utils/useForm'

export function useCreatePost() {
  const [mutate, { data, error }] = useMutation(CREATE_POST_MUTATION)
  return { mutate, data, error }
}

export const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
  })

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    // after sending new post to server, update local cache
    // refreshes UI without api call
    onError(err) {
      // needed to stop errors from blocking UI
      console.log({ onErr: true, funct: 'createPost', error, err })
    },
    update(cache, { data }) {
      const newPost = data.createPost
      const { getPosts: posts } = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [newPost, ...posts] },
      })
      values.body = ''
    },
  })

  function createPostCallback() {
    createPost()
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={Boolean(error)}
          />
          <Button type="submit" color="teal">
            {loading ? <ButtonSpinner /> : <Icon name="send" />}
            Submit
          </Button>
        </Form.Field>
      </Form>
      {Boolean(error) && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      body
      commentCount
      createdAt
      id
      likeCount
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`
