import React from "react";
import { deleteData, fetchData } from "../helper";
import { toast } from "react-toastify";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Table from "../components/Table";
import CategoryItem from "../components/CategoryItem";

//Loader for Categories Screen
export function categoriesLoader() {
  const categories = fetchData("budgetCategory");
  return { categories };
}

const CategoriesPage = () => {
  const { categories } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="grid-lg">
      <button className="btn" onClick={() => navigate(-1)}>
        <ArrowUturnLeftIcon width={20} />
        <span>Go Back</span>
      </button>
      <h1>All Categories</h1>
      {categories && categories.length > 0 ? (
        <div className="grid-md">
          <h4 className="accent">
            ( Total Number of categories : {categories.length} )
          </h4>
          <div className="budgets">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      ) : (
        <p className="accent">No Categories to show!</p>
      )}
    </div>
  );
};

export default CategoriesPage;
