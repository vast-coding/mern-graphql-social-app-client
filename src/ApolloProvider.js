import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

import App from './App'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('hi-world:jwt')
  const headers = { headers: { Authorization: token ? `Bearer ${token}` : '' } }
  return headers
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
