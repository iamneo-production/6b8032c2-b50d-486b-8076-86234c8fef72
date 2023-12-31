import React from "react";
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showCategory = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showCategory ? "Category" : "", ""].map(
              (i, index) => (
                <th key={i.length}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showCategory={showCategory} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
