import { Middleware, MiddlewareAPI, Dispatch } from 'redux'

const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (
  action: any
) => {
  console.group(action.type)
  console.info('%cFrom:', 'color: blue', store.getState())
  const result = next(action)
  console.info('Action: ', result)
  console.info('%cTo:', 'color: green', store.getState())
  console.groupEnd()

  return result
}

export default logger
