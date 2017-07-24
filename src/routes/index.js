// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import DashboardRoute from './Dashboard'
import KioskRoute from './Kiosk'
import UserContainer from './User/containers/UserContainer'
import Login from './Login/containers/Login'
import Signup from './Signup/containers/Signup'

export const createRoutes = (store) => ({
  component   : CoreLayout,
  childRoutes : [
    {
      component: UserContainer,
      childRoutes: [
        DashboardRoute(store),
        KioskRoute(store)
      ]
    },
    {
      path: 'login',
      component: Login
    },
    {
      path: 'signup',
      component: Signup
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
