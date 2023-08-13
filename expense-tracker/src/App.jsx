import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
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
import CustomErrorComponent from "./pages/CustomErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <CustomErrorComponent />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <CustomErrorComponent />,
      },
      {
        path: "category/:id",
        element: <CategoryPage />,
        loader: categoryLoader,
        action: categorAction,
        errorElement: <CustomErrorComponent />,
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
        errorElement: <CustomErrorComponent />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        loader: categoriesLoader,
        // action: expensesAction,
        errorElement: <CustomErrorComponent />,
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
