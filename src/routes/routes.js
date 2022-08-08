import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import BasicLayout from "../layouts/BasicLayout";
import MinimalLayout from "../layouts/MinimalLayout";

export default [
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