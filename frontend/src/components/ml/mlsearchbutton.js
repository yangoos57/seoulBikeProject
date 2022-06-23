import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "./assets/icons/Search.svg";
const MlSearchButton = () => {
  return (
    <div
      style={{
        position: "absolute", //
        height: "20%",
        width: "100%",
        zIndex: 1000,
      }}>
      <div
        className="d-flex" //
        style={{ height: "45%", width: "100%" }}></div>
      <div className="search-box px-4">
        <Link
          to="/ml/search" //
          className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
          <Search />
        </Link>
      </div>
    </div>
  );
};

export default MlSearchButton;
