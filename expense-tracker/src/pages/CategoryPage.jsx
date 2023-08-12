import React from "react";
import { createExpense, deleteData, getAllMatchingItems } from "../helper";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

//Loader for Category Screen
export async function categoryLoader({ params }) {
  const category = await getAllMatchingItems({
    category: "budgetCategory",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "categoryId",
    value: params.id,
  });

  if (!category) {
    throw new Error("The Category you're trying to find does not exist!");
  }

  return { category, expenses };
}

//Action for Category Screen
export async function categorAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const CategoryPage = () => {
  const { category, expenses } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="grid-lg" style={{ "--accent": category.color }}>
      <button className="btn" onClick={() => navigate(-1)}>
        <ArrowUturnLeftIcon width={20} />
        <span>Go Back</span>
      </button>
      <h1 className="h2">
        <span className="accent">{category.categoryName}</span> Overview
      </h1>
      <div className="flex-lg">
        <CategoryItem category={category} showDelete={true} />
        <AddExpenseForm categories={[category]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{category.categoryName}</span> Expenses{" "}
          </h2>
          <Table expenses={expenses} showCategory={false} />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
