import { Button, Form } from 'semantic-ui-react'
import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { AuthContext } from '../context/auth'
import { FormErrors } from '../components/FormErrors'
import { useForm } from '../utils/useForm'

const Register = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const initialState = {
    confirmPassword: '',
    email: '',
    password: '',
    username: '',
  }

  const { onChange, onSubmit, values } = useForm(registerUser, initialState)

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_proxy, { data: { register: userData } }) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  // hoists addUser, so it is available to useForm
  // fixes circular dependancy:
  // `useForm` provides `values` to, but needs `addUser`, from `useMutation`
  function registerUser() {
    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          error={Boolean(errors.email)}
          label="Email"
          name="email"
          onChange={onChange}
          placeholder="Email.."
          type="email"
          value={values.email}
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

        <Form.Input
          error={Boolean(errors.confirmPassword)}
          label="Confirm Password"
          name="confirmPassword"
          onChange={onChange}
          placeholder="Confirm Password.."
          type="password"
          value={values.confirmPassword}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      <FormErrors errors={errors} />
    </div>
  )
}
const REGISTER_USER_MUTATION = gql`
  mutation register(
    $confirmPassword: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    register(
      registerInput: {
        confirmPassword: $confirmPassword
        email: $email
        password: $password
        username: $username
      }
    ) {
      createdAt
      email
      id
      token
      username
    }
  }
`
export default Register
