import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import Layout from './components/Layout'

class App extends React.Component {
  public render() {
    return <Layout>{renderRoutes(routes)}</Layout>
  }
}

export default App
