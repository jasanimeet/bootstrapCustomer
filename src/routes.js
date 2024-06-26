import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import SearchContainer from "views/Search/SearchContainer";
import Cart from "views/Cart/Cart";
import Order from "views/Order/Order";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/search",
    name: "Search",
    icon: "nc-icon nc-diamond",
    component: <SearchContainer />,
    layout: "/admin",
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "nc-icon nc-pin-3",
    component: <Cart />,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: "nc-icon nc-pin-3",
    component: <Order />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: <Typography />,
    layout: "/admin",
  },
];
export default routes;
