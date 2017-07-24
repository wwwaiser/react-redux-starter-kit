import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/kiosk',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Kiosk = require('./containers/KioskContainer').default
      const reducer = require('./modules/kiosk').default

      injectReducer(store, { key: 'kiosk', reducer })

      cb(null, Kiosk)
    }, 'kiosk')
  }
})
