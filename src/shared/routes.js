import Home from './components/Home';
import NotFound from './components/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/404',
    exact: true,
    component: NotFound,
  },
];

export default routes;
