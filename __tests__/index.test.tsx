import * as React from 'react'
import { create } from 'react-test-renderer'
import App from '../src/client/App'

test('SnapShot', () => {
  const tree = create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
