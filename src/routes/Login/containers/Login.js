import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import { login } from 'store/user'

import LoginForm from '../components/LoginForm'

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    router: PropTypes.object,
    location: PropTypes.object,
  }

  componentDidMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (props) {
    const { user, router, location } = props

    if (user.accessToken) {
      return router.push(location.query['redirect-url'] || '/')
    }

    if (user.fetchStatus && user.fetchStatus.value === 'LOADED') {
      return router.push(location.query['redirect-url'] || '/')
    }
  }

  submit (values) {
    const { login } = this.props
    return login(values).catch(body => {
      throw new SubmissionError({ _error: body.message })
    })
  }

  render () {
    return (
      <div className='max-width-1 mx-auto'>
        <LoginForm onSubmit={::this.submit} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
