import loadable from 'loadable-components'

const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ /* webpackPrefetch: 30 */ './Home/components/Home')
)
const About = loadable(() =>
  import(/* webpackChunkName: "About" */ /* webpackPrefetch: 20 */ './About/components/About')
)
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
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/counter',
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
