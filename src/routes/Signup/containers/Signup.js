import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import { signup } from 'store/user'

import SignupForm from '../components/SignupForm'

class Signup extends Component {
  static propTypes = {
    user: PropTypes.object,
    signup: PropTypes.func,
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
    const { signup } = this.props
    return signup(values).catch(body => {
      throw new SubmissionError({ _error: body.message })
    })
  }

  render () {
    return (
      <div className='max-width-1 mx-auto'>
        <SignupForm onSubmit={::this.submit} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  signup
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
