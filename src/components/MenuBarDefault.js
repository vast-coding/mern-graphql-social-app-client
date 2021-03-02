import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export const MenuBarDefault = () => (
  <Menu pointing secondary size="massive" color="teal">
    <Menu.Item name="home" as={NavLink} exact to="/" />
    <Menu.Menu position="right">
      <Menu.Item name="login" as={NavLink} to="/login" />
      <Menu.Item name="register" as={NavLink} to="/register" />
    </Menu.Menu>
  </Menu>
)
