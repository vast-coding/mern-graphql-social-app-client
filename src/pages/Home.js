import { Grid, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../utils/graphql'
import { PostCard } from '../components/PostCard'
import { PostForm } from '../components/PostForm'
import { useContext } from 'react'
import { useQuery } from '@apollo/client'

const Home = () => {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    // fetchPolicy: 'network-only',
    onCompleted: () => {
      // console.log('FETCH_POSTS_QUERY completed')
    },
  })

  let posts = null
  if (data) {
    posts = data.getPosts
  }

  return (
    <Grid columns={3} stackable>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home
