import React from "react";
import "../assets/postyle.css";
const PoMainFrame = ({ children }) => {
  return (
    <div className="poWhole">
      <div className="poViewPort">
        <div className="poMainFrame">
          <div className="poBody" style={{ flexBasis: "90%" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoMainFrame;
