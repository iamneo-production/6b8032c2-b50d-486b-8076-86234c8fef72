import React from "react";

//Assets
import logomark from "../assets/logomark.svg";
import { Form, NavLink } from "react-router-dom";

//Icon Library
import { TrashIcon } from "@heroicons/react/24/solid";
const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logomark} alt="" height={30} />
        <span>Expense Tracker</span>
      </NavLink>

      {userName && (
        <>
          <NavLink to="categories" aria-label="Go to Home">
            <span>Categories</span>
          </NavLink>
          <NavLink to="expenses" aria-label="Go to Home">
            <span>Expenses</span>
          </NavLink>

          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
              if (!confirm("Delete all data")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Clear Data</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </>
      )}
    </nav>
  );
};

export default Nav;
