import React from "react";
import {
  calculateSpentByCategory,
  formatCurrency,
  formatPercentage,
} from "../helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const CategoryItem = ({ category, showDelete = false }) => {
  const { id, categoryName, amount, color } = category;

  const spentAmount = calculateSpentByCategory(id);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{categoryName}</h3>
        <p>{formatCurrency(amount)}</p>
      </div>
      <progress max={amount} value={spentAmount}>
        {formatPercentage(spentAmount / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spentAmount)}</small>
        <small>{formatCurrency(amount - spentAmount)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete this category ?")) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Category</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/category/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
