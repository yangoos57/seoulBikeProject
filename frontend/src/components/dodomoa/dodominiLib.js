import React, { useState } from "react";
import miniLogo from "./assets/minilogo.svg";
import DodoPopOver from "./dodopopover";
// Main Function
const DoDominiLib = ({ libs }) => {
  // libs = 선택한 도서관 개수 보여주기

  // 선택한 도서관 개수에 따라 제공되는 표현 달라짐
  if (libs.length > 1) {
    var val = libs[0] + " 외 " + (libs.length - 1);
  } else if (libs.length === 1) {
    var val = libs[0];
  }

  return (
    <div className="flex-container align-items-end mb-1">
      <div className="d-flex" style={{ flexBasis: "50%" }}>
        <img width="150px" src={miniLogo} alt="" />
      </div>
      <div className="d-flex" style={{ flexBasis: "50%", cursor: "pointer" }}>
        <div className="libBox-mini-dodo">
          {" "}
          <DodoPopOver name={val} />
        </div>
      </div>
    </div>
  );
};

export default DoDominiLib;
