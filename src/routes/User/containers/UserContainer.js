import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUser } from 'store/user'

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    getUser: PropTypes.func,
    router: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.node
  }

  componentDidMount () {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps (props) {
    const {
      getUser,
      location,
      user: { fetchStatus, accessToken },
      router
    } = props

    if (!accessToken) {
      return router.push(`/login?redirect-url=${location.pathname}`)
    }

    if (!fetchStatus) {
      return getUser()
    }

    if (fetchStatus.value === 'FAILED') {
      return router.push(`/login?redirect-url=${location.pathname}`)
    }
  }

  render () {
    const {
      user: { fetchStatus }
    } = this.props

    if (!fetchStatus) {
      return null
    }

    if (fetchStatus.value === 'LOADING') {
      return null
    }

    if (fetchStatus.value === 'LOADED') {
      return React.cloneElement(this.props.children, {})
    }
  }
}

const mapDispatchToProps = {
  getUser
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
