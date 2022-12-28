import AdminAuthPage from "../features/auth/pages/admin/AdminAuthPage";
import AdminDashboardPage from "../features/dataAnalyzing/pages/admin/AdminDashboardPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";


const routes = [
  {
    path: "/",
    element: <AdminAuthPage />,
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
