import AdminLayout from "../layouts/AdminLayout/AdminLayout"
//import HomeAdmin from "../pages/Admin/HomeAdmin/HomeAdmin";
import UsersAdmin from "../pages/Admin/UsersAdmin/UsersAdmin";
import CategoriesAdmin from "../pages/Admin/CategoriesAdmin/CategoriesAdmin";
import ProductsAdmin from "../pages/Admin/ProductsAdmin/ProductsAdmin";
import TablesAdmin from "../pages/Admin/TablesAdmin/TablesAdmin";
import OrdersAdmin from "../pages/Admin/OrdersAdmin/OrdersAdmin";
import TableDetails from "../pages/Admin/OrdersAdmin/TableDetails/TableDetails";
import PaymentHistoryAdmin from "../pages/Admin/PaymentHistoryAdmin/PaymentHistoryAdmin";

const routesAdmin = [
    {
        path : "/admin",
        layout : AdminLayout,
        component : OrdersAdmin,
    },
    {
        path : "/admin/users",
        layout : AdminLayout,
        component : UsersAdmin,
    },
    {
        path: "/admin/categories",
        layout : AdminLayout,
        component : CategoriesAdmin,
    },
    {
        path: "/admin/products",
        layout : AdminLayout,
        component : ProductsAdmin,
    },
    {
        path: "/admin/tables",
        layout : AdminLayout,
        component : TablesAdmin,
    },
    {
        path: "/admin/table/:id",
        layout : AdminLayout,
        component : TableDetails,
    },
    {
        path: "/admin/payments",
        layout : AdminLayout,
        component : PaymentHistoryAdmin,
    }
];

export default routesAdmin;