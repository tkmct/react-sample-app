import loadable from 'loadable-components'

const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ './Home/components/Home')
)
const About = loadable(() =>
  import(/* webpackChunkName: "About" */ './About/components/About')
)
const Counter = loadable(() =>
  import(/* webpackChunkName: "Counter" */ './Counter/components/Counter')
)
const NotFound = loadable(() =>
  import(/* webpackChunkName: "NotFound" */ './components/NotFound')
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
    component: NotFound
  }
]

export default routes
