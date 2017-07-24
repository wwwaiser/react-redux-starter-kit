import superagent from 'superagent'

const METHODS = {
  GET: 'get',
  POST: 'post',
  DELETE: 'del',
  PUT: 'put'
}

const apiUrl = 'http://localhost:4040'

const apiAction = ({ dispatch, getState, action }) => {
  const { user: { accessToken } } = getState()

  const [start, success, fail] = action.types

  const {
    url, method = 'GET', dataToDispatch,
    send, query
  } = action

  start && dispatch({ type: start, ...dataToDispatch })

  return new Promise((resolve, reject) => {
    superagent[METHODS[method]](`${apiUrl}/api${url}`)
      .query(query)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(send)
      .end((err, res) => {
        if (err) {
          dispatch({ type: fail, err })
          reject(res.body)
        } else {
          dispatch({ type: success, body: res.body })
          resolve(res.body)
        }
      })
  })
}

export default store => dispatch => async action => {
  if (action.url && !action.type) {
    return apiAction({ ...store, action })
  } else {
    return dispatch(action)
  }
}
