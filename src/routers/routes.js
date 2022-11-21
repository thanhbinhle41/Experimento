import AdminAuthPage from "../features/auth/pages/admin/AdminAuthPage";
import AdminDashboardPage from "../features/dataAnalyzing/pages/admin/AdminDashboardPage";
import HomePage from "../features/HomePage/pages/HomePage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";


const routes = [
  {
    path: "/Experimento",
    element: <HomePage></HomePage>,
  },
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/home-page",
    element: <HomePage></HomePage>,
  },
  {
    path: "/admin/login",
    element: <AdminAuthPage />,
  },
  {
    path: "/admin/dashboard",
    element: <PrivateRoutes component={<AdminDashboardPage />} />,
  },
];

export default routes;
