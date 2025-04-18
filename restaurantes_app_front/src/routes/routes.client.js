import ClientLayout from "../layouts/ClientLayout/ClientLayout"
import Categories from "../pages/Client/Categories/Categories";
import Home from "../pages/Client/Home"
import SelectTable from "../pages/Client/SelectTable/SelectTable";
import BasicLayout from "../layouts/BasicLayout"
import Products from "../pages/Client/Products/Products";
import Cart from "../pages/Client/Cart/Cart";
import Orders from "../pages/Client/Orders/Orders";

const routesClient = [
    {
        path : "/",
        layout : BasicLayout,
        component : SelectTable,
    },
    {
        path : "/client/:tableNumber",
        layout : ClientLayout,
        component : Categories,
    },
    {
        path : "/client/:tableNumber/:categoryId",
        layout : ClientLayout,
        component : Products,
    },
    {
        path : "/client/:tableNumber/cart",
        layout : ClientLayout,
        component : Cart,
    },
    {
        path : "/client/:tableNumber/orders",
        layout : ClientLayout,
        component : Orders,
    }
];

export default routesClient;