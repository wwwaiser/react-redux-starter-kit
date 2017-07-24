import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import './PageLayout.scss'

import { logout } from 'store/user'

const Logged = ({ logout, ...props }) => {
  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      onChange={(e, value) => {
        if (value === 'logout') {
          logout()
        }
      }}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem value='logout' primaryText='Sign out' />
    </IconMenu>
  )
}
Logged.propTypes = {
  logout: PropTypes.func
}
Logged.muiName = 'IconMenu'

export class PageLayout extends Component {
  state = {
    isDrawerOpen: false
  }

  getLoginOrSignupButton () {
    const { router } = this.props

    if (location.pathname.match('/login')) {
      return <FlatButton onClick={() => router.push('/signup')} label='Signup' />
    }

    return <FlatButton onClick={() => router.push('/login')} label='Login' />
  }

  render () {
    const { children, user, logout } = this.props

    const isUserLoaded = user.fetchStatus && (user.fetchStatus.value === 'LOADED')

    return (
      <div>
        <AppBar
          title='Title'
          iconElementRight={
            isUserLoaded ? <Logged logout={logout} /> : this.getLoginOrSignupButton()
          }
          onLeftIconButtonTouchTap={() => this.setState({ isDrawerOpen: true })}
        />
        <Drawer
          docked={false}
          open={this.state.isDrawerOpen}
          onRequestChange={(isDrawerOpen) => this.setState({ isDrawerOpen })}
        >
          <Link to='/'>
            <MenuItem onTouchTap={() => this.setState({ isDrawerOpen: false })}>Dashboard</MenuItem>
          </Link>
          <Link to='/kiosk'>
            <MenuItem onTouchTap={() => this.setState({ isDrawerOpen: false })}>Kiosk</MenuItem>
          </Link>
        </Drawer>
        {React.cloneElement(children, {})}
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  router: PropTypes.object,
  user: PropTypes.object,
  logout: PropTypes.func
}

const mapDispatchToProps = { logout }

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
