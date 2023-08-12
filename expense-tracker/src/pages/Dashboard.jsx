import React from "react";
//Helper Function
import {
  createBudgetCategory,
  createExpense,
  deleteData,
  fetchData,
} from "../helper";
import { Link, useLoaderData } from "react-router-dom";
import Login from "../components/Login";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import CategoryItem from "../components/CategoryItem";
import Table from "../components/Table";

//Loader for Dashboard Screen
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgetCategory = fetchData("budgetCategory");
  const expenses = fetchData("expenses");
  return { userName, budgetCategory, expenses };
}

//Action for Dashboard Screen
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // New User Creation
  if (_action === "newUserCreation") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  //New Category Creation
  if (_action === "newBudgetCategoryCreation") {
    try {
      createBudgetCategory({
        categoryName: values.newBudgetCategory,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget category created!");
    } catch (e) {
      throw new Error("There was a problem creating new budget category.");
    }
  }

  //Create a New Expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        categoryId: values.newExpenseBudgetCategory,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  //Delete an expense
  if (_action === "deleteExpense") {
    try {
      if (confirm("Are you sure you want to delete this expense")) {
        deleteData({ key: "expenses", id: values.expenseId });
        return toast.success("Expense deleted!");
      }
      return toast.warning("Expense delete cancelled!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  //Custom Hook to fetch data from loader function that is being provided by react-router-dom
  const { userName, budgetCategory, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgetCategory && budgetCategory.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm categories={budgetCategory} />
                </div>
                <h2>Existing Categories</h2>
                <div className="budgets">
                  {budgetCategory.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 3)}
                    />
                    {expenses.length > 3 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Personal Expense Tracking is the secret to financial freedom.
                </p>
                <p>
                  Create a <span className="accent">Budget</span> to get started
                </p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dashboard;
