import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

class Layout extends React.Component<Props> {
  public render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/">Counter</NavLink>
          </li>
          <li>
            <NavLink to="/githubsearch">GithubSearch</NavLink>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
