import { toast } from "react-toastify";
import { deleteData, getAllMatchingItems } from "../helper";
import { redirect } from "react-router-dom";

export function deleteCategory({ params }) {
  try {
    deleteData({
      key: "budgetCategory",
      id: params.id,
    });

    const linkedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "categoryId",
      value: params.id,
    });
    linkedExpenses.forEach((expense) => {
      deleteData({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Category deleted successfully!");
  } catch (error) {
    throw new Error("There was a problem deleting this category!");
  }

  return redirect("/");
}
