import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

import App from './App'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://gentle-tor-50679.herokuapp.com/',
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

const ApolloProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

export default ApolloProvider
