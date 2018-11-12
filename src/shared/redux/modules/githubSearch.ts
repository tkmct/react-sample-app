interface GitHubSearchState {
  result: any[]
  loading: boolean
}

type PayloadType = any[]

function githubSearch(
  state: GitHubSearchState = { result: [], loading: false },
  action: { type: 'SUCCESS' | 'FETCH' | 'CLEAR'; payload?: PayloadType }
): GitHubSearchState {
  switch (action.type) {
    case 'FETCH':
      return { ...state, loading: true }
    case 'SUCCESS':
      const result = action.payload || []
      return { result, loading: false }
    case 'CLEAR':
      return { ...state, result: [] }
    default:
      return state
  }
}

export default githubSearch
