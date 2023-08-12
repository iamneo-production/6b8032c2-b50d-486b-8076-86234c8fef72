import { redirect } from "react-router-dom";
//Helper Function
import { deleteCompletData, deleteData } from "../helper";
//Library
import { toast } from "react-toastify";

export async function logoutAction() {
  //Delete the user
  deleteCompletData();
  toast.success("You've deleted all your Expense Data");
  //return Redirect
  return redirect("/");
}
