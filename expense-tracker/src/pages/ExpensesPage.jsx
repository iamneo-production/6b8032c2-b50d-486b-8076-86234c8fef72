import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { deleteData, fetchData } from "../helper";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

//Loader for Expenses Screen
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

//Action for Expense Screen
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="grid-lg">
      <button className="btn" onClick={() => navigate(-1)}>
        <ArrowUturnLeftIcon width={20} />
        <span>Go Back</span>
      </button>
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h4 className="accent">
            ( Total Number of expenses : {expenses.length} )
          </h4>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p className="accent">No Expenses to show!</p>
      )}
    </div>
  );
};

export default ExpensesPage;
