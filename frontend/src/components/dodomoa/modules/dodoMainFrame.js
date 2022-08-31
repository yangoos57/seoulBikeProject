import React from "react";
import "../assets/dodostyle.css";

const DodoMainFrame = ({ children }) => {
  return (
    <div className="whole-dodo d-flex ">
      <div className="main-dodo m-auto ">
        <div className="flex-column flex-container">{children}</div>
      </div>
    </div>
  );
};

export default DodoMainFrame;
