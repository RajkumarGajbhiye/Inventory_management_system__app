import SignUp from "../pages/SignUp";
import App from "../App";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Editproducts from "../pages/Editproducts";
import Buyers from "../pages/Buyers";
import Order from "../pages/Order";
import EditBuyers from "../pages/EditBuyers";
import Suppliers from "../pages/Suppliers";
import EditSuppliers from "../pages/EditSuppliers";
import ProtectedRoute from "../components/ProtectedRoute";

const route = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "product",
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit/:_id",
    element: (
      <ProtectedRoute>
        <Editproducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "editbuyers/:_id",
    element: (
      <ProtectedRoute>
        <EditBuyers />
      </ProtectedRoute>
    ),
  },
  {
    path: "editsupplier/:_id",
    element: (
      <ProtectedRoute>
        <EditSuppliers />
      </ProtectedRoute>
    ),
  },
  {
    path: "order",
    element: (
      <ProtectedRoute>
        <Order />
      </ProtectedRoute>
    ),
  },
  {
    path: "buyers",
    element: (
      <ProtectedRoute>
        <Buyers />
      </ProtectedRoute>
    ),
  },
  {
    path: "suppliers",
    element: (
      <ProtectedRoute>
        <Suppliers />
      </ProtectedRoute>
    ),
  },
];

export default route;
