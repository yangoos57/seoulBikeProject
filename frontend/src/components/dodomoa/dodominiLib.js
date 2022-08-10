import React from "react";
import miniLogo from "./assets/minilogo.svg";

// Main Function
const DoDominiLib = () => {
  return (
    <div className="flex-container align-items-end mb-1">
      <div className="d-flex" style={{ flexBasis: "50%" }}>
        <img width="150px" src={miniLogo} alt="" />
      </div>
      <div className="d-flex" style={{ flexBasis: "50%" }}>
        <div className="ms-auto libBox-mini-dodo"> 양천도서관 외 1</div>
      </div>
    </div>
  );
};

export default DoDominiLib;
