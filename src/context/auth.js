import { createContext, useReducer } from 'react'

import { useSession } from './useSession'

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const { setToken, removeToken, dataToken } = useSession()
  const initialState = { user: dataToken }
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    setToken(userData.token)
    dispatch({ type: 'LOGIN', payload: userData })
  }

  const logout = () => {
    removeToken()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    ></AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
