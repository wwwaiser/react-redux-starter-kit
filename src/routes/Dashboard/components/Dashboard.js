import React from 'react'
import PropTypes from 'prop-types'

export const Dashboard = ({ counter, increment, doubleAsync, getRandom }) => (
  <div style={{ margin: '0 auto' }} >
    <h1>Dashboard Page</h1>

    <h2>Counter: {counter}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>
    <button className='btn btn-secondary' onClick={getRandom}>
      getRandom
    </button>
  </div>
)
Dashboard.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  getRandom: PropTypes.func.isRequired,
}

export default Dashboard
