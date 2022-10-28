import AdminAuthPage from "../features/auth/pages/admin/AdminAuthPage";
import AdminDashboardPage from "../features/dataAnalyzing/pages/admin/AdminDashboardPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import HomePage from "../pages/HomePage/HomePage";

const routes = [
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
