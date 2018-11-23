import loadable from 'loadable-components'

const Counter = loadable(() =>
  import(/* webpackChunkName: "Counter" */ /* webpackPrefetch: 10 */ './Counter/components/Counter')
)
const GithubSearch = loadable(() =>
  import(/* webpackChunkName: "GithubSearch" */ /* webpackPrefetch: 5 */ './GithubSearch/components')
)
const NotFound = loadable(() =>
  import(/* webpackChunkName: "NotFound" */ /* webpackPrefetch: -1 */ './components/NotFound')
)

const routes = [
  {
    path: '/',
    exact: true,
    component: Counter
  },
  {
    path: '/githubsearch',
    component: GithubSearch
  },
  {
    component: NotFound
  }
]

export default routes
