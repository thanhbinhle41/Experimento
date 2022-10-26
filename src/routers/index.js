import { useRoutes } from "react-router-dom";

import routes from "./routes";

const AppRoute = () => {
  const route = useRoutes(routes);

  return route;
};

export default AppRoute;
