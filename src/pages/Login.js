import { Button, Form } from 'semantic-ui-react'
import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { FormErrors } from '../components/FormErrors'
import { useForm } from '../utils/useForm'

const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const initialState = {
    password: '',
    username: '',
  }

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  )

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_proxy, { data: { login: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      console.log({ err })
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  // hoists addUser, so it is available to useForm
  // fixes circular dependancy:
  // `useForm` provides `values` to, but needs `addUser`, from `useMutation`
  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          error={Boolean(errors.username)}
          label="Username"
          name="username"
          onChange={onChange}
          placeholder="Username.."
          type="text"
          value={values.username}
        />

        <Form.Input
          error={Boolean(errors.password)}
          label="Password"
          name="password"
          onChange={onChange}
          placeholder="Password.."
          type="password"
          value={values.password}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      <FormErrors errors={errors} />
    </div>
  )
}
const LOGIN_USER_MUTATION = gql`
  mutation login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      createdAt
      email
      id
      token
      username
    }
  }
`
export default Login
