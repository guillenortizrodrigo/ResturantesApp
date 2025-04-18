import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import Error404 from "../pages/Error404";
import BasicLayout from "../layouts/BasicLayout";

const routes = [
    ...routesAdmin, ...routesClient, {
        path: "*",
        layout: BasicLayout ,
        component: Error404,
    }
]

export default routes