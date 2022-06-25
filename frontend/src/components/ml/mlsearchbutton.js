import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Search } from "./assets/icons/Search.svg";
const MlSearchButton = ({ name = "" }) => {
  return (
    <div
      style={{
        position: "absolute", //
        width: "100%",
        zIndex: 1000,
      }}>
      <div
        className="d-flex" //
        style={{ height: "11vh", width: "100%" }}></div>
      <div className="search-box px-4 flex-container" style={{ height: "11%" }}>
        <Link
          to="/ml/search" //
          className="search-box-inner m-auto py-3 px-4 flex-item justify-content-start"
          style={{ textDecoration: "none", color: "inherit" }}>
          <div className="d-flex">
            <div className="my-auto">
              {" "}
              <Search width="25px" height="25px" />
            </div>
            {/* <div className="my-auto ms-3 fs-5" style={{ wordSpacing: "3px", letterSpacing: "2px" }}> */}
            <input type="text" placeholder={name} className="search-input ms-2" />
            {/* {name} */}
            {/* </div> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MlSearchButton;
