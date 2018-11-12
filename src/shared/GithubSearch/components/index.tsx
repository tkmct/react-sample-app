import * as React from 'react'
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'

class GithubSearch extends React.Component {
  public render() {
    return (
      <div>
        <SearchForm />
        <SearchResult />
      </div>
    )
  }
}

export default GithubSearch
