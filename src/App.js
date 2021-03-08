import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { Route, HashRouter as Router } from 'react-router-dom'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'
import { Container } from 'semantic-ui-react'
import Home from './pages/Home'
import Login from './pages/Login'
import { MenuBar } from './components/menuBar'
import React from 'react'
import Register from './pages/Register'
import { SinglePost } from './components/SinglePost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar></MenuBar>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
