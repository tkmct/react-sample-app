function githubSearch(
  state = { result: [], loading: false },
  action: { type: 'SUCCESS' | 'FETCH' | 'CLEAR'; payload?: any }
) {
  switch (action.type) {
    case 'FETCH':
      return { ...state, loading: true }
    case 'SUCCESS':
      return { result: action.payload || [], loading: false }
    case 'CLEAR':
      return { ...state, result: [] }
    default:
      return state
  }
}

export default githubSearch
