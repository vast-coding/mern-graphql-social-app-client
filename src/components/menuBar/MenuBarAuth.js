import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export const MenuBarAuth = ({ user, logout }) => (
  <Menu pointing secondary size="massive" color="teal">
    <Menu.Item name={user.username} active as={NavLink} exact to="/" />
    <Menu.Menu position="right">
      <Menu.Item name="logout" onClick={logout} />
    </Menu.Menu>
  </Menu>
)
