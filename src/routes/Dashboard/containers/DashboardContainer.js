import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/dashboard'
import { getRandom } from 'store/user'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the dashboard:   */

import Dashboard from '../components/Dashboard'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  getRandom
}

const mapStateToProps = (state) => {
  return {
    counter : state.dashboard
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
