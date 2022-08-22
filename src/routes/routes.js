import Home from '../pages/Home';
import User from '../pages/User';
import Users from '../pages/Users';
import Error404 from '../pages/Error404';
import BasicLayout from '../layouts/BasicLayout';
import MinimalLayout from '../layouts/MinimalLayout';

export default [
    {
        path: '/users',
        component: Users,
        layout: BasicLayout,
        className: 'users',
        exact: true,
    },
    {
        path: '/:user_id',
        component: User,
        layout: BasicLayout,
        className: 'user',
        exact: true,
    },
    {
        path: '/',
        component: Home,
        layout: BasicLayout,
        className: 'home',
        exact: true,
    },
    {
        path: '*',
        component: Error404,
        layout: MinimalLayout,
        className: 'error404',
        exact: true,
    }
]