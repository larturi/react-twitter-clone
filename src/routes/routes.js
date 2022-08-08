import Home from "../pages/Home";
import Error404 from "../pages/Error404";

export default [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '*',
        component: Error404,
        exact: true,
    }
]