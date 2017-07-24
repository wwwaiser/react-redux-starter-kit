import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

export const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => {
  return (
    <TextField
      type={type}
      hintText={placeholder}
      floatingLabelText={label}
      errorText={touched && (error || warning)}
      fullWidth
      {...input}
    />
  )
}

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
}
