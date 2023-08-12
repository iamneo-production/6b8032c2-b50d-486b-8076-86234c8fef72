import React from "react";
//Helper Function
import { fetchData } from "../helper";
import { Outlet, useLoaderData } from "react-router-dom";
//Assets
import wave from "../assets/wave.svg";
//Components
import Nav from "../components/Nav";

//Loader for Main Screen
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  //Custom Hook to fetch data from loader function that is being provided by react-router-dom
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
