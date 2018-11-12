import * as React from 'react'
import { connect } from 'react-redux'

interface Props {
  search: (query: string) => any
  searchSuccess: (result: any[]) => any
}

interface State {
  searchText: string
}

class SearchForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      searchText: ''
    }
  }
  public handleChange = (e: React.ChangeEvent) => {
    this.setState({ searchText: (e.target as any).value }) // TODO: fix
  }

  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    this.props.search(this.state.searchText)
    // TODO: extract into middleware
    fetch(
      `https://api.github.com/search/repositories?q=${
        this.state.searchText
      }&sort=stars&order=desc`
    )
      .then((response: Response) => {
        return response.json()
      })
      .then(data => {
        this.props.searchSuccess(data.items)
      })
  }

  public render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="text" onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default connect(
  undefined,
  {
    search: (query: string) => ({ type: 'FETCH', payload: query }),
    searchSuccess: (result: any[]) => ({ type: 'SUCCESS', payload: result })
  }
)(SearchForm)
