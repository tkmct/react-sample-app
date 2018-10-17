import loadable from 'loadable-components'

const Home = loadable(() => import('./Home/components/Home'))
const About = loadable(() => import('./About/components/About'))
const Counter = loadable(() => import('./Counter/components/Counter'))
const NotFound = loadable(() => import('./components/NotFound'))

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
