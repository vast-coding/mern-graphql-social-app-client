import React, { useContext } from 'react'

import { AuthContext } from '../../context/auth'
import { MenuBarAuth } from './MenuBarAuth'
import { MenuBarDefault } from './MenuBarDefault'

function MenuBar() {
  const { user, logout } = useContext(AuthContext)

  return user ? <MenuBarAuth user={user} logout={logout} /> : <MenuBarDefault />
}

export { MenuBar }
