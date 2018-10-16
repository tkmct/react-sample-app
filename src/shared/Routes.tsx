import * as React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Home from './Home/components/Home'
import About from './About/components/About'
import Counter from './Counter/components/Counter'
import NotFound from './components/NotFound'

class Routes extends React.Component {
  public render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/counter">Counter</NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/counter" component={Counter} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default Routes
