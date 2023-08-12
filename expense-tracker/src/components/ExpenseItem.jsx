import React from "react";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helper";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({ expense, showCategory }) => {
  const fetcher = useFetcher();

  const category = getAllMatchingItems({
    category: "budgetCategory",
    key: "id",
    value: expense.categoryId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showCategory && (
        <td>
          <Link
            to={`/category/${category.id}`}
            style={{ "--accent": category.color }}
          >
            {category.categoryName}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
