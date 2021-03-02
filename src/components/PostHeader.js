import { Card, Image } from 'semantic-ui-react'

import { utcToDate } from '../utils/utcToDate'

const UserImage = () => (
  <Image
    floated="right"
    size="mini"
    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
  />
)

export const PostHeader = ({
  body,
  createdAt,
  isUserImage = false,
  username,
}) => (
  <Card.Content>
    {isUserImage && <UserImage />}
    <Card.Header>{username}</Card.Header>
    <Card.Meta>{utcToDate(createdAt)}</Card.Meta>
    <Card.Description>{body}</Card.Description>
  </Card.Content>
)
