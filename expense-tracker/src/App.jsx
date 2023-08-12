import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";

//Library Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import CategoryPage, {
  categorAction,
  categoryLoader,
} from "./pages/CategoryPage";
import { deleteCategory } from "./actions/deleteCategory";
import CategoriesPage, { categoriesLoader } from "./pages/CategoriesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "category/:id",
        element: <CategoryPage />,
        loader: categoryLoader,
        action: categorAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteCategory,
          },
        ],
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        loader: categoriesLoader,
        // action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
