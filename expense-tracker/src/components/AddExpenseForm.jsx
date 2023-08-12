import { PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ categories }) => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      //Reset the form
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {categories.length === 1 &&
            `${categories.map((category) => category.categoryName)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Milk, Bread"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g, ₹ 40"
              required
              inputMode="decimal"
              min="0"
              onChange={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
            />
          </div>
        </div>

        <div className="grid-xs" hidden={categories.length === 1}>
          <label htmlFor="newExpenseBudgetCategory">Budget Category</label>
          <select
            name="newExpenseBudgetCategory"
            id="newExpenseBudgetCategory"
            required
          >
            {categories
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting....</span>
          ) : (
            <>
              <span>Add Expense</span> <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
