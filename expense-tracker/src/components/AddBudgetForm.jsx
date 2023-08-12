import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
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
      <h2 className="h3">Create Budget Category</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudgetCategory">Category Name</label>
          <input
            type="text"
            name="newBudgetCategory"
            id="newBudgetCategory"
            placeholder="e.g, Groceries, Rent, Transportation"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g, ₹ 350"
            required
            inputMode="decimal"
            min="0"
            onChange={(e) => {
              if (e.target.value < 0) e.target.value = 0;
            }}
          />
        </div>
        <input type="hidden" name="_action" value="newBudgetCategoryCreation" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting....</span>
          ) : (
            <>
              <span>Create Category</span> <CurrencyRupeeIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
