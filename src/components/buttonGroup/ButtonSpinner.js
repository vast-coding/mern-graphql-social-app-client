import { Loader } from 'semantic-ui-react'

// styling is to match existing heart icon
export const ButtonSpinner = () => (
  <Loader
    active
    inline="centered"
    size="mini"
    style={{
      display: 'inline-block',
      height: '12px',
      marginTop: '-3px',
      width: '16.516px',
      marginLeft: '-3px',
      marginRight: '6px',
    }}
  />
)
