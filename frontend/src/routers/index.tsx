import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import ClientsPage from "../pages/ClientsPage";
import ClientDetailsPage from "../pages/ClientDetailsPage";
import EstimatesPage from "../pages/EstimatesPage";

let router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/clients",
    Component: ClientsPage,
  },
  {
    path: "/clients/:id",
    Component: ClientDetailsPage,
  },
  {
    path: "/estimates",
    Component: EstimatesPage,
  },
]);

export default router;
