import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { required, email } from 'utils/validators'
import { renderField } from 'utils/forms'

import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { red500 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const validate = values => {
  const errors = {}

  errors.email = required(values.email) || email(values.email)

  errors.password = required(values.password)

  return errors
}

let SignupForm = props => {
  const { handleSubmit, error } = props

  return (
    <Paper style={{ padding: 20, margin: '50px 10px' }} rounded={false}>
      {
        error && <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            color: 'rgb(244, 67, 54)'
          }}
        >
          <ErrorIcon color={red500} /> {error}
        </div>
      }
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: 'center' }}
      >
        <div>
          <Field label='Email' name='email' component={renderField} type='text' />
        </div>
        <div>
          <Field label='Password' name='password' component={renderField} type='password' />
        </div>
        <br />
        <RaisedButton className='mx-auto' type='submit' label='Signup' primary />
      </form>
    </Paper>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string
}

SignupForm = reduxForm({
  form: 'signup',
  validate
})(SignupForm)

export default SignupForm
